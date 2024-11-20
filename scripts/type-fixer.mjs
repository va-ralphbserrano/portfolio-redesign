import { Project, Node, SyntaxKind, QuoteKind } from 'ts-morph';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class TypeScriptFixer {
    constructor() {
        // Initialize ts-morph Project with tsconfig.json
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
        this.backupDir = path.join(process.cwd(), 'type-fixer-backups');
        this.modifiedFiles = new Set();
        this.fixLog = [];

        // Create backup directory if it doesn't exist
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    backup(filePath) {
        const fileName = path.basename(filePath);
        const backupPath = path.join(this.backupDir, `${fileName}.${Date.now()}.bak`);
        fs.copyFileSync(filePath, backupPath);
        this.log(`Created backup: ${backupPath}`);
    }

    log(message) {
        this.fixLog.push(message);
        console.log(message);
    }

    fixAnyTypes(sourceFile) {
        let modified = false;
        const filePath = sourceFile.getFilePath();

        try {
            // Fix variable declarations with 'any' type
            sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration).forEach(declaration => {
                const typeNode = declaration.getTypeNode();
                if (typeNode?.getText() === 'any') {
                    const initializer = declaration.getInitializer();
                    if (initializer) {
                        const inferredType = this.inferTypeFromValue(initializer);
                        if (inferredType) {
                            declaration.setType(inferredType);
                            modified = true;
                            this.log(`Fixed 'any' type for variable '${declaration.getName()}' to '${inferredType}'`);
                        }
                    }
                }
            });

            // Fix function parameters with 'any' type and return types
            sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration).forEach(func => {
                const funcName = func.getName() || 'anonymous';
                let funcModified = false;
                
                // Fix parameters
                func.getParameters().forEach(param => {
                    const typeNode = param.getTypeNode();
                    if (typeNode?.getText() === 'any') {
                        const inferredType = this.inferParameterType(param, func);
                        if (inferredType) {
                            param.setType(inferredType);
                            modified = true;
                            funcModified = true;
                            this.log(`Fixed parameter '${param.getName()}' type to '${inferredType}' in function '${funcName}'`);
                        }
                    }
                });

                // Fix return type if modified or missing
                if (funcModified || !func.getReturnTypeNode()) {
                    const inferredType = this.inferFunctionReturnType(func);
                    if (inferredType) {
                        func.setReturnType(inferredType);
                        modified = true;
                        this.log(`Added return type '${inferredType}' to function '${funcName}'`);
                    }
                }
            });

            // Fix array types
            sourceFile.getDescendantsOfKind(SyntaxKind.ArrayType).forEach(arrayType => {
                if (arrayType.getElementTypeNode()?.getText() === 'any') {
                    const parent = arrayType.getParent();
                    if (parent.getKind() === SyntaxKind.VariableDeclaration) {
                        const initializer = parent.getInitializer();
                        if (initializer?.getKind() === SyntaxKind.ArrayLiteralExpression) {
                            const inferredType = this.inferTypeFromValue(initializer);
                            if (inferredType) {
                                parent.setType(inferredType);
                                modified = true;
                                this.log(`Fixed array type for '${parent.getName()}' to '${inferredType}'`);
                            }
                        }
                    }
                }
            });

            // Fix object types
            sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration).forEach(declaration => {
                const typeNode = declaration.getTypeNode();
                if (typeNode?.getText() === 'any') {
                    const initializer = declaration.getInitializer();
                    if (initializer?.getKind() === SyntaxKind.ObjectLiteralExpression) {
                        const inferredType = this.inferTypeFromValue(initializer);
                        if (inferredType) {
                            declaration.setType(inferredType);
                            modified = true;
                            this.log(`Fixed object type for '${declaration.getName()}' to '${inferredType}'`);
                        }
                    }
                }
            });

            if (modified) {
                // Format the source file
                sourceFile.formatText({
                    indentSize: 4,
                    convertTabsToSpaces: true
                });
                
                // Get the updated content
                const fileContent = sourceFile.getFullText();
                
                // Write changes to disk
                fs.writeFileSync(filePath, fileContent, 'utf8');
                this.log(`Updated file: ${filePath}`);
            }

            return modified;
        } catch (error) {
            this.log(`Error fixing types in ${filePath}: ${error.message}`);
            throw error;
        }
    }

    async fix() {
        console.log('Starting type fixes...');
        const sourceFiles = this.project.getSourceFiles();
        let totalModified = 0;

        for (const sourceFile of sourceFiles) {
            const filePath = sourceFile.getFilePath();
            
            // Skip node_modules and test files
            if (filePath.includes('node_modules') || 
                filePath.includes('.test.') || 
                filePath.includes('.spec.')) {
                continue;
            }

            console.log(`\nProcessing ${filePath}`);

            try {
                // Create backup before modifications
                this.backup(filePath);

                // Apply all fixes
                let modified = false;
                modified = await this.fixAnyTypes(sourceFile) || modified;
                modified = await this.fixTypeMismatches(sourceFile) || modified;
                modified = await this.fixMissingProperties(sourceFile) || modified;
                modified = await this.fixModuleImports(sourceFile) || modified;
                modified = await this.fixEnumTypeMismatches(sourceFile) || modified;
                modified = await this.fixMissingRequiredProperties(sourceFile) || modified;

                if (modified) {
                    totalModified++;
                    this.modifiedFiles.add(filePath);
                    console.log(`Modified ${filePath}`);
                }
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error);
            }
        }

        if (totalModified > 0) {
            console.log(`\nSaved changes to ${totalModified} files`);
            await this.project.save();
        } else {
            console.log('\nNo changes were necessary');
        }

        return totalModified;
    }

    async runTypeCheck() {
        try {
            console.log('Running TypeScript compiler...');
            const diagnostics = this.project.getPreEmitDiagnostics();
            
            if (diagnostics.length > 0) {
                console.log('\nType errors found:');
                diagnostics.forEach(diagnostic => {
                    const message = diagnostic.getMessageText();
                    const location = diagnostic.getStart();
                    const sourceFile = diagnostic.getSourceFile();
                    const fileName = sourceFile ? sourceFile.getFilePath() : 'unknown';
                    const position = location ? sourceFile?.getLineAndColumnAtPos(location) : null;
                    
                    if (position) {
                        console.log(`${fileName}:${position.line}:${position.column} - ${message}`);
                    } else {
                        console.log(`${fileName} - ${message}`);
                    }
                });
                return false;
            } else {
                console.log('No type errors found!');
                return true;
            }
        } catch (error) {
            console.error('Error during type checking:', error);
            throw error;
        }
    }

    getReport() {
        return {
            modifiedFiles: Array.from(this.modifiedFiles),
            log: this.fixLog
        };
    }

    fixEnumTypeMismatches(sourceFile) {
        let modified = false;
        const filePath = sourceFile.getFilePath();

        try {
            // Find all string literals being assigned to enum types
            sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment).forEach(prop => {
                const type = prop.getType();
                const typeText = type.getText();
                
                // Check if the type is an enum
                if (type.isEnum()) {
                    const initializer = prop.getInitializer();
                    if (initializer && initializer.getKind() === SyntaxKind.StringLiteral) {
                        const value = initializer.getText().replace(/['"]/g, '');
                        const enumType = type.getSymbol()?.getName();
                        
                        if (enumType) {
                            // Get the enum declaration
                            const enumDecl = sourceFile.getProject().getSourceFiles()
                                .map(sf => sf.getEnum(enumType))
                                .find(e => e !== undefined);

                            if (enumDecl) {
                                const enumMembers = enumDecl.getMembers();
                                const validValues = enumMembers.map(m => m.getValue());
                                
                                // If the value isn't valid for this enum
                                if (!validValues.includes(value)) {
                                    // Find the closest matching enum value
                                    const closestMatch = validValues.find(v => 
                                        v.toLowerCase() === value.toLowerCase()
                                    );
                                    
                                    if (closestMatch) {
                                        initializer.replaceWithText(`${enumType}.${closestMatch}`);
                                        modified = true;
                                        this.log(`Fixed enum value '${value}' to '${enumType}.${closestMatch}'`);
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (modified) {
                sourceFile.formatText();
                const fileContent = sourceFile.getFullText();
                fs.writeFileSync(filePath, fileContent, 'utf8');
                this.log(`Updated file with enum fixes: ${filePath}`);
            }

            return modified;
        } catch (error) {
            this.log(`Error fixing enum types in ${filePath}: ${error.message}`);
            throw error;
        }
    }

    fixMissingRequiredProperties(sourceFile) {
        let modified = false;
        const filePath = sourceFile.getFilePath();

        try {
            // Find all object literal expressions
            sourceFile.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression).forEach(obj => {
                const type = obj.getType();
                const properties = type.getProperties();
                const existingProps = new Set(obj.getProperties().map(p => p.getName()));
                
                // Check each required property
                properties.forEach(prop => {
                    if (!prop.isOptional() && !existingProps.has(prop.getName())) {
                        const propType = prop.getTypeAtLocation(obj);
                        const defaultValue = this.getDefaultValueForType(propType);
                        
                        if (defaultValue !== undefined) {
                            // Add the missing property
                            obj.addPropertyAssignment({
                                name: prop.getName(),
                                initializer: defaultValue
                            });
                            modified = true;
                            this.log(`Added missing required property '${prop.getName()}' with value '${defaultValue}'`);
                        }
                    }
                });
            });

            if (modified) {
                sourceFile.formatText();
                const fileContent = sourceFile.getFullText();
                fs.writeFileSync(filePath, fileContent, 'utf8');
                this.log(`Updated file with missing property fixes: ${filePath}`);
            }

            return modified;
        } catch (error) {
            this.log(`Error fixing missing properties in ${filePath}: ${error.message}`);
            throw error;
        }
    }

    async fixTypeMismatches(sourceFile) {
        let modified = false;
        const filePath = sourceFile.getFilePath();
        const typeChecker = this.project.getTypeChecker();

        try {
            // Get all variable declarations
            sourceFile.forEachDescendant(node => {
                if (Node.isVariableDeclaration(node)) {
                    const typeNode = node.getTypeNode();
                    const initializer = node.getInitializer();
                    
                    if (typeNode && initializer) {
                        const declaredType = typeChecker.getTypeAtLocation(typeNode);
                        const initializerType = typeChecker.getTypeAtLocation(initializer);
                        
                        // Check if there's a type mismatch
                        if (!typeChecker.isTypeAssignableTo(initializerType, declaredType)) {
                            console.log(`Found type mismatch in ${filePath}:`);
                            console.log(`  Expected: ${typeChecker.typeToString(declaredType)}`);
                            console.log(`  Got: ${typeChecker.typeToString(initializerType)}`);
                            
                            // Try to fix by removing explicit type annotation if it's wrong
                            node.removeType();
                            modified = true;
                            console.log('  Fixed by removing explicit type annotation');
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Error fixing type mismatches in ${filePath}:`, error);
        }

        return modified;
    }

    fixMissingProperties(sourceFile) {
        let modified = false;

        // Fix missing properties in object literals
        sourceFile.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression).forEach(obj => {
            const type = this.project.getTypeChecker().getContextualType(obj);
            if (type) {
                const properties = type.getProperties();
                const existingProps = new Set(obj.getProperties().map(p => p.getName()));

                properties.forEach(prop => {
                    if (!existingProps.has(prop.getName())) {
                        const propType = prop.getValueDeclaration()?.getType();
                        if (propType) {
                            obj.addPropertyAssignment({
                                name: prop.getName(),
                                initializer: this.getDefaultValueForType(propType)
                            });
                            modified = true;
                        }
                    }
                });
            }
        });

        return modified;
    }

    fixModuleImports(sourceFile) {
        let modified = false;

        // Fix module imports
        sourceFile.getImportDeclarations().forEach(importDecl => {
            const moduleSpecifier = importDecl.getModuleSpecifier().getText().replace(/['"]/g, '');
            
            // Fix case sensitivity issues in imports
            if (moduleSpecifier.includes('/')) {
                const segments = moduleSpecifier.split('/');
                const lastSegment = segments[segments.length - 1];
                
                if (lastSegment !== lastSegment.toLowerCase()) {
                    segments[segments.length - 1] = lastSegment.toLowerCase();
                    importDecl.setModuleSpecifier(segments.join('/'));
                    modified = true;
                }
            }

            // Fix missing exports
            const namedImports = importDecl.getNamedImports();
            namedImports.forEach(named => {
                const name = named.getName();
                if (!this.project.getTypeChecker().getSymbolAtLocation(named.getNameNode())) {
                    // Try to find a similar export
                    const module = this.project.getSourceFile(moduleSpecifier + '.ts');
                    if (module) {
                        const exports = module.getExportedDeclarations();
                        const similarExport = Array.from(exports.keys()).find(exp => 
                            exp.toLowerCase() === name.toLowerCase()
                        );
                        if (similarExport) {
                            named.rename(similarExport);
                            modified = true;
                        }
                    }
                }
            });
        });

        return modified;
    }

    getDefaultValueForType(type) {
        if (type.isString()) return '""';
        if (type.isNumber()) return '0';
        if (type.isBoolean()) return 'false';
        if (type.isArray()) return '[]';
        if (type.isObject()) return '{}';
        return 'undefined';
    }

    inferTypeFromValue(node) {
        if (!node) return undefined;

        try {
            switch (node.getKind()) {
                case SyntaxKind.StringLiteral:
                    return 'string';
                case SyntaxKind.NumericLiteral:
                    return 'number';
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return 'boolean';
                case SyntaxKind.ArrayLiteralExpression: {
                    const elements = node.getElements();
                    if (elements.length === 0) return 'unknown[]';
                    
                    // Infer type from all elements
                    const elementTypes = new Set();
                    elements.forEach(element => {
                        const type = this.inferTypeFromValue(element);
                        if (type) elementTypes.add(type);
                    });
                    
                    if (elementTypes.size === 0) return 'unknown[]';
                    if (elementTypes.size === 1) return `${Array.from(elementTypes)[0]}[]`;
                    return `(${Array.from(elementTypes).join(' | ')})[]`;
                }
                case SyntaxKind.ObjectLiteralExpression: {
                    const properties = node.getProperties();
                    const propertyTypes = properties
                        .map(prop => {
                            if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                                const name = prop.getName();
                                const value = prop.getInitializer();
                                
                                // Handle project-specific discriminated unions
                                if (name === 'category' && value?.getKind() === SyntaxKind.StringLiteral) {
                                    const categoryValue = value.getLiteralValue();
                                    if (['web', 'mobile', 'design', 'technical', 'other'].includes(categoryValue)) {
                                        return `category: ProjectCategory`;
                                    }
                                }
                                
                                // Handle method declarations
                                if (value?.getKind() === SyntaxKind.FunctionExpression || 
                                    value?.getKind() === SyntaxKind.ArrowFunction) {
                                    const funcType = this.inferFunctionType(value);
                                    return `${name}: ${funcType}`;
                                }
                                
                                const type = this.inferTypeFromValue(value);
                                return type ? `${name}: ${type}` : undefined;
                            }
                            return undefined;
                        })
                        .filter(Boolean);

                    // Check if this might be a Project type
                    if (this.mightBeProjectType(properties)) {
                        return 'Project';
                    }

                    if (propertyTypes.length === 0) return 'Record<string, unknown>';
                    return `{ ${propertyTypes.join('; ')} }`;
                }
                case SyntaxKind.CallExpression:
                    return this.inferCallExpressionType(node);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return this.inferFunctionType(node);
                default:
                    return undefined;
            }
        } catch (error) {
            this.log(`Error inferring type: ${error.message}`);
            return undefined;
        }
    }

    mightBeProjectType(properties) {
        const requiredProps = ['id', 'title', 'description', 'category', 'image', 'thumbnail', 'technologies'];
        const propNames = properties.map(p => p.getName());
        return requiredProps.every(prop => propNames.includes(prop));
    }

    inferFunctionType(node) {
        try {
            const parameters = node.getParameters();
            const paramTypes = parameters.map(param => {
                const name = param.getName();
                const typeNode = param.getTypeNode();
                const type = typeNode ? typeNode.getText() : this.inferParameterType(param, node);
                const isOptional = param.hasQuestionToken();
                const isRest = param.isRestParameter();
                
                if (isRest) {
                    return `...${name}: ${type}[]`;
                }
                return `${name}${isOptional ? '?' : ''}: ${type}`;
            });

            const returnType = node.getReturnTypeNode()?.getText() || 
                             this.inferFunctionReturnType(node) || 
                             'void';

            // Handle generic type parameters
            const typeParams = node.getTypeParameters();
            if (typeParams && typeParams.length > 0) {
                const typeParamStrings = typeParams.map(param => {
                    const name = param.getName();
                    const constraint = param.getConstraint();
                    const defaultType = param.getDefault();
                    
                    let result = name;
                    if (constraint) {
                        result += ` extends ${this.inferTypeFromValue(constraint)}`;
                    }
                    if (defaultType) {
                        result += ` = ${this.inferTypeFromValue(defaultType)}`;
                    }
                    return result;
                });
                
                return `<${typeParamStrings.join(', ')}>(${paramTypes.join(', ')}) => ${returnType}`;
            }

            return `(${paramTypes.join(', ')}) => ${returnType}`;
        } catch (error) {
            console.error('Error in inferFunctionType:', error);
            return undefined;
        }
    }

    inferCallExpressionType(node) {
        try {
            const expression = node.getExpression();
            const symbol = expression.getSymbol();
            if (symbol) {
                const declarations = symbol.getDeclarations();
                if (declarations && declarations.length > 0) {
                    const declaration = declarations[0];
                    if (declaration.getKind() === SyntaxKind.FunctionDeclaration) {
                        const returnType = declaration.getReturnTypeNode();
                        if (returnType) return returnType.getText();
                    }
                }
            }
            
            // Handle generic type inference
            const typeArguments = node.getTypeArguments();
            if (typeArguments && typeArguments.length > 0) {
                const baseType = expression.getText();
                const argTypes = typeArguments.map(arg => arg.getText()).join(', ');
                return `${baseType}<${argTypes}>`;
            }

            return undefined;
        } catch (error) {
            console.error('Error in inferCallExpressionType:', error);
            return undefined;
        }
    }

    inferParameterType(param, func) {
        const name = param.getName().toLowerCase();
        const usages = func.getReferencesOf(param);

        // Try to infer from usage
        for (const usage of usages) {
            const parent = usage.getParent();
            if (parent) {
                const type = parent.getType();
                if (!type.isAny()) {
                    return type.getText();
                }
            }
        }

        // Try to infer from function body
        const funcBody = func.getBody();
        if (funcBody) {
            const typeChecks = funcBody.getDescendantsOfKind(SyntaxKind.IfStatement)
                .filter(ifStmt => {
                    const condition = ifStmt.getExpression();
                    return condition.getText().includes(`typeof ${name}`);
                });

            if (typeChecks.length > 0) {
                const types = new Set();
                typeChecks.forEach(ifStmt => {
                    const condition = ifStmt.getExpression().getText();
                    if (condition.includes('string')) types.add('string');
                    if (condition.includes('number')) types.add('number');
                    if (condition.includes('boolean')) types.add('boolean');
                    if (condition.includes('object')) types.add('Record<string, unknown>');
                    if (condition.includes('function')) types.add('Function');
                });

                if (types.size === 1) return Array.from(types)[0];
                if (types.size > 1) return Array.from(types).join(' | ');
            }
        }

        // Fallback to name-based inference with more patterns
        if (name.includes('id') || name.includes('index') || name.includes('count')) return 'number';
        if (name.includes('name') || name.includes('email') || name.includes('url') || name.includes('str')) return 'string';
        if (name.includes('is') || name.includes('has') || name.includes('should') || name.includes('can')) return 'boolean';
        if (name.includes('date') || name.includes('time')) return 'Date';
        if (name.includes('options') || name.includes('config') || name.includes('settings')) return 'Record<string, unknown>';
        if (name.includes('callback') || name.includes('fn') || name.includes('func')) return '(result: unknown) => void';
        if (name.includes('list') || name.includes('array') || name.includes('items')) return 'unknown[]';
        if (name.includes('map') || name.includes('dict')) return 'Record<string, unknown>';
        if (name.includes('regex') || name.includes('pattern')) return 'RegExp';
        if (name.includes('data') || name.includes('user')) return 'Record<string, unknown>';
        
        return undefined;
    }

    inferFunctionReturnType(func) {
        const returnStatements = func.getDescendantsOfKind(SyntaxKind.ReturnStatement);
        if (returnStatements.length === 0) return 'void';

        const returnTypes = new Set();
        returnStatements.forEach(stmt => {
            const expr = stmt.getExpression();
            if (expr) {
                const type = this.inferTypeFromValue(expr);
                if (type) returnTypes.add(type);
            }
        });

        // Check if function has type checks that indicate return types
        const funcBody = func.getBody();
        if (funcBody) {
            const typeChecks = funcBody.getDescendantsOfKind(SyntaxKind.IfStatement)
                .filter(ifStmt => {
                    const condition = ifStmt.getExpression().getText();
                    return condition.includes('typeof');
                });

            typeChecks.forEach(ifStmt => {
                const thenReturn = ifStmt.getThenStatement()
                    ?.getFirstDescendantByKind(SyntaxKind.ReturnStatement)
                    ?.getExpression();
                
                if (thenReturn) {
                    const type = this.inferTypeFromValue(thenReturn);
                    if (type) returnTypes.add(type);
                }
            });
        }

        if (returnTypes.size === 0) return 'void';
        if (returnTypes.size === 1) return Array.from(returnTypes)[0];
        return Array.from(returnTypes).join(' | ');
    }

    async runTypeCheck() {
        try {
            console.log('Running TypeScript compiler...');
            const diagnostics = this.project.getPreEmitDiagnostics();
            
            if (diagnostics.length > 0) {
                console.log('\nType errors found:');
                diagnostics.forEach(diagnostic => {
                    const message = diagnostic.getMessageText();
                    const location = diagnostic.getStart();
                    const sourceFile = diagnostic.getSourceFile();
                    const fileName = sourceFile ? sourceFile.getFilePath() : 'unknown';
                    const position = location ? sourceFile?.getLineAndColumnAtPos(location) : null;
                    
                    if (position) {
                        console.log(`${fileName}:${position.line}:${position.column} - ${message}`);
                    } else {
                        console.log(`${fileName} - ${message}`);
                    }
                });
                return false;
            } else {
                console.log('No type errors found!');
                return true;
            }
        } catch (error) {
            console.error('Error during type checking:', error);
            throw error;
        }
    }

    getReport() {
        return {
            modifiedFiles: Array.from(this.modifiedFiles),
            log: this.fixLog
        };
    }
}

// Run the fixer
async function main() {
    try {
        console.log('Initializing TypeScript Fixer...');
        const fixer = new TypeScriptFixer();
        
        // Run initial type check
        console.log('\nRunning initial type check...');
        await fixer.runTypeCheck();
        
        // Run fixes
        console.log('\nApplying type fixes...');
        const totalModified = await fixer.fix();
        
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
        console.error('Error running type fixer:', error);
        process.exit(1);
    }
}

main();

export default TypeScriptFixer;
