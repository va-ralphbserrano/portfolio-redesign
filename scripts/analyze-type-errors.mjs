import { Project } from 'ts-morph';
import path from 'path';

class TypeErrorAnalyzer {
    constructor() {
        this.project = new Project({
            tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
            skipAddingFilesFromTsConfig: false
        });
    }

    analyzeErrors() {
        const diagnostics = this.project.getPreEmitDiagnostics();
        const errorsByCategory = new Map();
        const errorsByFile = new Map();

        for (const diagnostic of diagnostics) {
            const code = diagnostic.getCode();
            const message = typeof diagnostic.getMessageText() === 'string' 
                ? diagnostic.getMessageText() 
                : diagnostic.getMessageText().messageText;
            const file = diagnostic.getSourceFile()?.getFilePath() || 'unknown';
            
            // Categorize by error code
            if (!errorsByCategory.has(code)) {
                errorsByCategory.set(code, {
                    count: 0,
                    message: message,
                    examples: []
                });
            }
            const category = errorsByCategory.get(code);
            category.count++;
            if (category.examples.length < 3) {
                category.examples.push({
                    file: file,
                    message: message,
                    line: diagnostic.getLineNumber()
                });
            }

            // Group by file
            if (!errorsByFile.has(file)) {
                errorsByFile.set(file, []);
            }
            errorsByFile.get(file).push({
                code,
                message,
                line: diagnostic.getLineNumber()
            });
        }

        // Sort categories by frequency
        const sortedCategories = Array.from(errorsByCategory.entries())
            .sort((a, b) => b[1].count - a[1].count);

        console.log('\nType Error Analysis\n');
        console.log('Most Common Error Types:');
        console.log('----------------------');
        sortedCategories.forEach(([code, info]) => {
            console.log(`\nError ${code} (${info.count} occurrences):`);
            console.log(`Message: ${info.message}`);
            console.log('Examples:');
            info.examples.forEach(ex => {
                console.log(`- ${ex.file}:${ex.line}`);
            });
        });

        console.log('\n\nFiles with Most Errors:');
        console.log('----------------------');
        const sortedFiles = Array.from(errorsByFile.entries())
            .sort((a, b) => b[1].length - a[1].length)
            .slice(0, 10);
        
        sortedFiles.forEach(([file, errors]) => {
            console.log(`\n${file} (${errors.length} errors):`);
            const errorCounts = errors.reduce((acc, err) => {
                acc[err.code] = (acc[err.code] || 0) + 1;
                return acc;
            }, {});
            Object.entries(errorCounts)
                .sort((a, b) => b[1] - a[1])
                .forEach(([code, count]) => {
                    console.log(`- Error ${code}: ${count} occurrences`);
                });
        });

        return {
            totalErrors: diagnostics.length,
            errorsByCategory: errorsByCategory,
            errorsByFile: errorsByFile
        };
    }
}

async function main() {
    const analyzer = new TypeErrorAnalyzer();
    const analysis = analyzer.analyzeErrors();
    
    // Output summary
    console.log('\nSummary:');
    console.log(`Total type errors: ${analysis.totalErrors}`);
    console.log(`Unique error codes: ${analysis.errorsByCategory.size}`);
    console.log(`Files with errors: ${analysis.errorsByFile.size}`);
}

main();
