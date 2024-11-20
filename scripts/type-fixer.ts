import { Project, Node, TypeGuards, ts } from 'ts-morph';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class TypeScriptFixer {
    private project: Project;
    private backupDir: string;
    private modifiedFiles: Set<string>;
    private fixLog: string[];

    constructor(tsConfigPath: string) {
        this.project = new Project({
            tsConfigFilePath: tsConfigPath,
        });
        this.backupDir = path.join(process.cwd(), 'type-fixer-backups');
        this.modifiedFiles = new Set<string>();
        this.fixLog = [];

        // Create backup directory if it doesn't exist
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    private backup(filePath: string): void {
        const fileName = path.basename(filePath);
        const backupPath = path.join(this.backupDir, `${fileName}.${Date.now()}.bak`);
        fs.copyFileSync(filePath, backupPath);
        this.log(`Created backup: ${backupPath}`);
    }

    private log(message: string): void {
        this.fixLog.push(message);
        console.log(message);
    }

    private fixAnyTypes(sourceFile: ts.SourceFile): void {
        const declarations = sourceFile.getDescendantsOfKind(ts.SyntaxKind.VariableDeclaration);
        
        declarations.forEach(declaration => {
            const type = declaration.getType();
            if (type.isAny()) {
                // Try to infer type from usage
                const inferredType = this.inferType(declaration);
                if (inferredType) {
                    declaration.setType(inferredType);
                    this.log(`Fixed 'any' type in ${sourceFile.getFilePath()}`);
                }
            }
        });
    }

    private inferType(node: Node): string | undefined {
        // Basic type inference logic
        if (TypeGuards.isVariableDeclaration(node)) {
            const initializer = node.getInitializer();
            if (initializer) {
                if (TypeGuards.isStringLiteral(initializer)) return 'string';
                if (TypeGuards.isNumericLiteral(initializer)) return 'number';
                if (TypeGuards.isObjectLiteralExpression(initializer)) return 'object';
                if (TypeGuards.isArrayLiteralExpression(initializer)) return 'any[]';
            }
        }
        return undefined;
    }

    private fixFunctionSignatures(sourceFile: ts.SourceFile): void {
        const functions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.FunctionDeclaration);
        
        functions.forEach(func => {
            const returnType = func.getReturnType();
            if (returnType.isAny()) {
                // Try to infer return type from implementation
                const inferredReturnType = this.inferFunctionReturnType(func);
                if (inferredReturnType) {
                    func.setReturnType(inferredReturnType);
                    this.log(`Fixed function return type in ${sourceFile.getFilePath()}`);
                }
            }
        });
    }

    private inferFunctionReturnType(func: ts.FunctionDeclaration): string | undefined {
        // Basic return type inference
        const returnStatements = func.getDescendantsOfKind(ts.SyntaxKind.ReturnStatement);
        if (returnStatements.length > 0) {
            const returnExpr = returnStatements[0].getExpression();
            if (returnExpr) {
                return this.inferType(returnExpr);
            }
        }
        return undefined;
    }

    public async fix(): Promise<void> {
        const sourceFiles = this.project.getSourceFiles();
        
        for (const sourceFile of sourceFiles) {
            const filePath = sourceFile.getFilePath();
            
            // Skip node_modules and test files
            if (filePath.includes('node_modules') || filePath.includes('.test.ts')) {
                continue;
            }

            // Create backup before modifying
            this.backup(filePath);

            // Fix type issues
            this.fixAnyTypes(sourceFile);
            this.fixFunctionSignatures(sourceFile);

            // Save changes if any were made
            if (sourceFile.wasSaved()) {
                this.modifiedFiles.add(filePath);
            }
        }

        // Save all changes
        await this.project.save();

        // Run type checking
        this.runTypeCheck();
    }

    private runTypeCheck(): void {
        try {
            execSync('npm run typecheck', { stdio: 'inherit' });
            this.log('Type checking passed successfully!');
            
            // Try to build the project
            execSync('npm run build', { stdio: 'inherit' });
            this.log('Build completed successfully!');
        } catch (error) {
            this.log('Error during type checking or build:');
            this.log(error instanceof Error ? error.message : String(error));
            throw error;
        }
    }

    public getReport(): string {
        return [
            '\nType Fixer Report',
            '================',
            `Total files modified: ${this.modifiedFiles.size}`,
            '\nModified files:',
            ...Array.from(this.modifiedFiles),
            '\nFix log:',
            ...this.fixLog
        ].join('\n');
    }
}

// Run the fixer
async function main() {
    const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
    const fixer = new TypeScriptFixer(tsConfigPath);
    
    try {
        await fixer.fix();
        console.log(fixer.getReport());
    } catch (error) {
        console.error('Error running type fixer:', error);
        process.exit(1);
    }
}

// Check if this module is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export default TypeScriptFixer;
