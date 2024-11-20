import { Project, SyntaxKind, Node } from 'ts-morph';
import path from 'path';

class TypeErrorFixer {
    constructor() {
        this.project = new Project({
            tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
            skipAddingFilesFromTsConfig: false
        });
        this.fixLog = [];
    }

    async fixAll() {
        // 1. Fix unused variables
        await this.fixUnusedVariables();
        
        // 2. Fix missing properties/methods
        await this.fixMissingMethods();
        
        // 3. Fix type assignments
        await this.fixTypeAssignments();
        
        // 4. Fix type compatibility
        await this.fixTypeCompatibility();

        // Save all changes
        await this.project.save();
        
        return this.fixLog;
    }

    async fixUnusedVariables() {
        const sourceFiles = this.project.getSourceFiles();
        
        for (const sourceFile of sourceFiles) {
            try {
                const unusedDecls = sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)
                    .filter(decl => {
                        try {
                            const refs = decl.findReferencesAsNodes();
                            return refs.length <= 1; // Only declaration, no usage
                        } catch (error) {
                            console.warn(`Warning: Could not check references for variable in ${sourceFile.getFilePath()}: ${error.message}`);
                            return false;
                        }
                    });

                for (const decl of unusedDecls) {
                    try {
                        const parent = decl.getParent();
                        if (!parent || !Node.isVariableDeclarationList(parent)) continue;
                        
                        const stmt = parent.getParent();
                        if (!stmt) continue;

                        // Skip if the variable is named 'base' and is assigned from import.meta.env
                        try {
                            const initializer = decl.getInitializer();
                            if (decl.getName() === 'base' && initializer?.getText().includes('import.meta.env')) {
                                continue;
                            }
                        } catch (error) {
                            console.warn(`Warning: Could not check initializer for 'base' variable: ${error.message}`);
                            continue;
                        }

                        stmt.remove();
                        this.fixLog.push(`Removed unused variable: ${decl.getName()} in ${sourceFile.getFilePath()}`);
                    } catch (error) {
                        console.warn(`Warning: Could not remove variable in ${sourceFile.getFilePath()}: ${error.message}`);
                    }
                }
            } catch (error) {
                console.warn(`Warning: Error processing file ${sourceFile.getFilePath()}: ${error.message}`);
            }
        }
    }

    async fixMissingMethods() {
        // Add missing methods to MonitoringService
        const monitoringFile = this.project.getSourceFile(
            path.join(process.cwd(), 'src/services/MonitoringService/index.ts')
        );
        
        if (monitoringFile) {
            const monitoringClass = monitoringFile.getClass('MonitoringService');
            if (monitoringClass) {
                // Add trackMetric if missing
                if (!monitoringClass.getMethod('trackMetric')) {
                    monitoringClass.addMethod({
                        isStatic: true,
                        name: 'trackMetric',
                        parameters: [{ name: 'metric', type: 'MetricData' }],
                        returnType: 'void',
                        statements: 'MonitoringService.getInstance().addMetric(metric);'
                    });
                    this.fixLog.push('Added trackMetric to MonitoringService');
                }

                // Add trackError if missing
                if (!monitoringClass.getMethod('trackError')) {
                    monitoringClass.addMethod({
                        isStatic: true,
                        name: 'trackError',
                        parameters: [{ name: 'error', type: 'ErrorData' }],
                        returnType: 'void',
                        statements: 'MonitoringService.getInstance().handleError(error);'
                    });
                    this.fixLog.push('Added trackError to MonitoringService');
                }
            }
        }

        // Add missing methods to ErrorReportingService
        const errorReportingFile = this.project.getSourceFile(
            path.join(process.cwd(), 'src/services/ErrorReportingService.ts')
        );
        
        if (errorReportingFile) {
            const errorReportingClass = errorReportingFile.getClass('ErrorReportingService');
            if (errorReportingClass) {
                // Add reportError if missing
                if (!errorReportingClass.getMethod('reportError')) {
                    errorReportingClass.addMethod({
                        name: 'reportError',
                        parameters: [
                            { name: 'error', type: 'Error' },
                            { name: 'options', type: 'ErrorReportingOptions', hasQuestionToken: true }
                        ],
                        returnType: 'void',
                        statements: [
                            'if (this.rateLimitService.isRateLimited("error-reporting")) {',
                            '    console.warn("Error reporting rate limit exceeded");',
                            '    return;',
                            '}',
                            '',
                            'const errorId = uuidv4();',
                            'const timestamp = new Date().toISOString();',
                            '',
                            'MonitoringService.trackError({',
                            '    id: errorId,',
                            '    name: error.name,',
                            '    message: error.message,',
                            '    stack: error.stack,',
                            '    timestamp,',
                            '    category: options?.category || "unknown",',
                            '    severity: options?.severity || "medium",',
                            '    tags: options?.tags || []',
                            '});'
                        ].join('\n')
                    });
                    this.fixLog.push('Added reportError to ErrorReportingService');
                }
            }
        }
    }

    async fixTypeAssignments() {
        const sourceFiles = this.project.getSourceFiles();
        
        for (const sourceFile of sourceFiles) {
            // Fix ProjectCategory enum assignments
            sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral)
                .filter(node => {
                    const type = node.getType();
                    return type.isStringLiteral() && 
                           ['web', 'design', 'autocad', 'inventor'].includes(type.getLiteralValue());
                })
                .forEach(node => {
                    const value = node.getLiteralValue();
                    node.replaceWithText(`ProjectCategory.${value}`);
                    this.fixLog.push(`Converted string literal to enum: ${value} in ${sourceFile.getFilePath()}`);
                });
        }
    }

    async fixTypeCompatibility() {
        const sourceFiles = this.project.getSourceFiles();
        
        for (const sourceFile of sourceFiles) {
            // Fix Error type compatibility
            sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)
                .filter(call => {
                    try {
                        const type = call.getType();
                        return type && type.getCallSignatures().some(sig => 
                            sig.getParameters().some(param => {
                                const paramType = param.getDeclaration()?.getType();
                                return paramType && paramType.getText().includes('Error');
                            })
                        );
                    } catch (error) {
                        console.warn(`Warning: Could not check call signature in ${sourceFile.getFilePath()}: ${error.message}`);
                        return false;
                    }
                })
                .forEach(call => {
                    try {
                        const args = call.getArguments();
                        args.forEach(arg => {
                            try {
                                const type = arg.getType();
                                if (type.getText() === 'unknown') {
                                    arg.replaceWithText(
                                        `(${arg.getText()} instanceof Error ? ${arg.getText()} : new Error(String(${arg.getText()})))`
                                    );
                                    this.fixLog.push(`Added Error type guard in ${sourceFile.getFilePath()}`);
                                }
                            } catch (error) {
                                console.warn(`Warning: Could not fix argument in ${sourceFile.getFilePath()}: ${error.message}`);
                            }
                        });
                    } catch (error) {
                        console.warn(`Warning: Could not process call expression in ${sourceFile.getFilePath()}: ${error.message}`);
                    }
                });
        }
    }
}

async function main() {
    const fixer = new TypeErrorFixer();
    const fixes = await fixer.fixAll();
    
    console.log('\nApplied Fixes:');
    console.log('-------------');
    fixes.forEach(fix => console.log(fix));
    
    // Run type check again
    const diagnostics = fixer.project.getPreEmitDiagnostics();
    console.log(`\nRemaining type errors: ${diagnostics.length}`);
}

main();
