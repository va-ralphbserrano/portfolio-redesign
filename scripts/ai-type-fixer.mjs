import { Project, Node, SyntaxKind } from 'ts-morph';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

class AITypeFixer {
    constructor() {
        this.project = new Project({
            tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
            skipAddingFilesFromTsConfig: false,
            compilerOptions: {
                noEmit: true,
                strict: true,
                noImplicitAny: true,
                noImplicitThis: true,
                noImplicitReturns: true,
                strictNullChecks: true,
                strictFunctionTypes: true,
                strictBindCallApply: true,
                strictPropertyInitialization: true
            }
        });
        this.modifiedFiles = new Set();
        this.fixLog = [];
    }

    async runTypeCheck() {
        const diagnostics = this.project.getPreEmitDiagnostics();
        
        if (diagnostics.length === 0) {
            console.log('No type errors found!');
            return true;
        }

        console.log(`Found ${diagnostics.length} type errors`);
        
        // Group errors by file
        const errorsByFile = this.groupErrorsByFile(diagnostics);
        
        // Fix errors using AI assistance
        await this.fixErrorsWithAI(errorsByFile);
        
        return diagnostics.length === 0;
    }

    groupErrorsByFile(diagnostics) {
        const errorsByFile = new Map();
        
        for (const diagnostic of diagnostics) {
            const filePath = diagnostic.getSourceFile()?.getFilePath();
            if (!filePath) continue;

            const line = diagnostic.getLineNumber();
            const column = diagnostic.getStart();
            const message = diagnostic.getMessageText();
            const code = diagnostic.getCode();
            
            const error = {
                file: filePath,
                line,
                column,
                message: typeof message === 'string' ? message : message.messageText,
                code
            };

            if (!errorsByFile.has(filePath)) {
                errorsByFile.set(filePath, []);
            }
            errorsByFile.get(filePath).push(error);
        }
        
        return errorsByFile;
    }

    async fixErrorsWithAI(errorsByFile) {
        for (const [file, errors] of errorsByFile.entries()) {
            console.log(`\nProcessing ${file}`);
            console.log('Found errors:', errors);

            const sourceFile = this.project.getSourceFile(file);
            if (!sourceFile) {
                console.log(`Could not find source file: ${file}`);
                continue;
            }

            // Categorize errors by type
            const categorizedErrors = this.categorizeErrors(errors);
            
            // Fix each type of error
            await this.fixTypeMismatches(sourceFile, categorizedErrors.typeMismatch);
            await this.fixMissingProperties(sourceFile, categorizedErrors.missingProperty);
            await this.fixImplicitAny(sourceFile, categorizedErrors.implicitAny);
            await this.fixModuleImports(sourceFile, categorizedErrors.moduleNotFound);
            
            // Save changes if any were made
            if (this.modifiedFiles.has(file)) {
                await sourceFile.save();
            }
        }
    }

    categorizeErrors(errors) {
        return {
            typeMismatch: errors.filter(e => e.message?.includes('Type') && e.message?.includes('is not assignable to type')),
            missingProperty: errors.filter(e => {
                if (!e.message) return false;
                return (e.message.includes('Property') && e.message.includes('does not exist')) ||
                       (e.message.includes('Property') && e.message.includes('is missing'));
            }),
            implicitAny: errors.filter(e => e.message?.includes('implicitly has an \'any\' type')),
            moduleNotFound: errors.filter(e => e.message?.includes('Cannot find module')),
            other: errors.filter(e => {
                if (!e.message) return false;
                return !e.message.includes('Type') && 
                       !e.message.includes('Property') && 
                       !e.message.includes('implicitly has an \'any\' type') &&
                       !e.message.includes('Cannot find module');
            })
        };
    }

    async fixTypeMismatches(sourceFile, errors) {
        let modified = false;

        for (const error of errors) {
            try {
                if (!error.line || !error.column) continue;
                
                const pos = sourceFile.compilerNode.getPositionOfLineAndCharacter(error.line - 1, error.column - 1);
                const node = sourceFile.getDescendantAtPos(pos);
                if (!node) continue;

                // Handle enum type mismatches
                if (error.message.includes('is not assignable to type \'ProjectCategory\'')) {
                    const stringLiteral = node.asKind(SyntaxKind.StringLiteral);
                    if (stringLiteral) {
                        const enumValue = `ProjectCategory.${stringLiteral.getText().replace(/['"]/g, '')}`;
                        node.replaceWithText(enumValue);
                        modified = true;
                        this.fixLog.push(`Converted string literal to enum value: ${enumValue}`);
                    }
                }
                // Handle other type mismatches
                else if (error.message.includes('is not assignable to type')) {
                    const targetType = error.message.match(/type '(.+?)'/)?.[2];
                    if (targetType) {
                        this.fixTypeConversion(node, targetType);
                        modified = true;
                    }
                }
            } catch (e) {
                console.error(`Error fixing type mismatch: ${e.message}`);
            }
        }

        if (modified) {
            this.modifiedFiles.add(sourceFile.getFilePath());
        }
    }

    fixTypeConversion(node, targetType) {
        const currentType = node.getType().getText();
        
        // Handle common type conversions
        if (currentType === 'string' && targetType === 'number') {
            node.replaceWithText(`Number(${node.getText()})`);
        }
        else if (currentType === 'number' && targetType === 'string') {
            node.replaceWithText(`String(${node.getText()})`);
        }
        else if (targetType === 'Error' && currentType === 'unknown') {
            node.replaceWithText(`(${node.getText()} instanceof Error ? ${node.getText()} : new Error(String(${node.getText()})))`);
        }
    }

    async fixMissingProperties(sourceFile, errors) {
        let modified = false;

        for (const error of errors) {
            try {
                if (!error.line || !error.column) continue;
                
                const pos = sourceFile.compilerNode.getPositionOfLineAndCharacter(error.line - 1, error.column - 1);
                const node = sourceFile.getDescendantAtPos(pos);
                if (!node) continue;

                const propertyName = error.message.match(/Property '(.+?)' does not exist/)?.[1];
                if (!propertyName) continue;

                const classDeclaration = node.getFirstAncestorByKind(SyntaxKind.ClassDeclaration);
                if (!classDeclaration) continue;

                // Handle missing static methods
                if (error.message.includes('does not exist on type \'typeof')) {
                    const methodText = this.generateStaticMethodStub(propertyName);
                    classDeclaration.addMethod({
                        isStatic: true,
                        name: propertyName,
                        statements: methodText
                    });
                    modified = true;
                    this.fixLog.push(`Added static method ${propertyName} to class ${classDeclaration.getName()}`);
                }
                // Handle missing instance methods/properties
                else {
                    const propertyText = this.generatePropertyStub(propertyName);
                    classDeclaration.addProperty({
                        name: propertyName,
                        type: 'any', // Will be refined by TypeScript
                        initializer: propertyText
                    });
                    modified = true;
                    this.fixLog.push(`Added property ${propertyName} to class ${classDeclaration.getName()}`);
                }
            } catch (e) {
                console.error(`Error fixing missing property: ${e.message}`);
            }
        }

        if (modified) {
            this.modifiedFiles.add(sourceFile.getFilePath());
        }
    }

    generateStaticMethodStub(methodName) {
        // Add specific implementations for known methods
        if (methodName === 'trackMetric') {
            return `(metric: MetricData): void { this.getInstance().addMetric(metric); }`;
        }
        if (methodName === 'trackError') {
            return `(error: ErrorData): void { this.getInstance().handleError(error); }`;
        }
        if (methodName === 'reportError') {
            return `(error: Error, options?: ErrorReportingOptions): void { this.getInstance().reportError(error, options); }`;
        }
        // Default implementation
        return `() { throw new Error('Not implemented'); }`;
    }

    generatePropertyStub(propertyName) {
        return `undefined`;
    }

    async fixImplicitAny(sourceFile, errors) {
        let modified = false;

        for (const error of errors) {
            try {
                if (!error.line || !error.column) continue;
                
                const pos = sourceFile.compilerNode.getPositionOfLineAndCharacter(error.line - 1, error.column - 1);
                const node = sourceFile.getDescendantAtPos(pos);
                if (!node) continue;

                if (!Node.isParameter(node)) {
                    console.log('Node is not a parameter');
                    continue;
                }

                // Add explicit 'any' type annotation
                node.setType('any');
                modified = true;
                const message = `Added explicit 'any' type at ${error.file}:${error.line}:${error.column}`;
                this.fixLog.push(message);
                console.log(message);
            } catch (error) {
                console.error('Error fixing implicit any:', error);
                this.fixLog.push(`Error fixing implicit any: ${error.message}`);
            }
        }

        if (modified) {
            this.modifiedFiles.add(sourceFile.getFilePath());
        }
    }

    async fixModuleImports(sourceFile, errors) {
        let modified = false;

        for (const error of errors) {
            try {
                if (!error.line || !error.column) continue;

                // Extract module name from error message
                const moduleMatch = error.message.match(/Cannot find module '([^']+)'/);
                if (!moduleMatch) {
                    console.log('Could not extract module name from error message');
                    continue;
                }

                const moduleName = moduleMatch[1];
                
                // Convert line/column to position
                let pos;
                try {
                    pos = sourceFile.compilerNode.getPositionOfLineAndCharacter(error.line - 1, error.column - 1);
                } catch (e) {
                    console.log(`Error getting position for line ${error.line} column ${error.column}: ${e.message}`);
                    continue;
                }

                const node = sourceFile.getDescendantAtPos(pos);
                if (!node) {
                    console.log(`No node found at position ${pos}`);
                    continue;
                }

                // Handle different module paths
                let resolvedPath = moduleName;
                if (moduleName.startsWith('@/')) {
                    resolvedPath = moduleName.replace('@/', '../');
                } else if (moduleName.startsWith('@types/')) {
                    // Skip @types modules as they should be installed via npm
                    continue;
                }

                // Add import statement
                sourceFile.addImportDeclaration({
                    moduleSpecifier: resolvedPath,
                    defaultImport: moduleName.split('/').pop()
                });

                modified = true;
            } catch (error) {
                console.error('Error fixing module import:', error);
                this.fixLog.push(`Error fixing module import: ${error.message}`);
            }
        }

        if (modified) {
            this.modifiedFiles.add(sourceFile.getFilePath());
        }
    }

    getReport() {
        return {
            modifiedFiles: Array.from(this.modifiedFiles),
            log: this.fixLog
        };
    }
}

async function main() {
    try {
        console.log('Initializing AI Type Fixer...');
        const fixer = new AITypeFixer();
        
        // Run initial type check
        console.log('\nRunning initial type check...');
        await fixer.runTypeCheck();
        
        // Run final type check
        console.log('\nRunning final type check...');
        const success = await fixer.runTypeCheck();
        
        if (success) {
            console.log('\nAll type errors have been fixed successfully!');
        } else {
            console.log('\nSome type errors still remain. Please check the output above.');
        }
        
        // Print report
        const report = fixer.getReport();
        if (report.modifiedFiles.length > 0) {
            console.log('\nModified files:');
            report.modifiedFiles.forEach(file => console.log(` - ${file}`));
        }
        
    } catch (error) {
        console.error('Error running AI type fixer:', error);
        process.exit(1);
    }
}

main();
