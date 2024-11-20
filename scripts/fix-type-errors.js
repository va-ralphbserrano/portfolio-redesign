const fs = require('fs').promises;
const path = require('path');
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SRC_DIR = path.join(process.cwd(), 'src');

async function findTypeScriptFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  let tsFiles = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      tsFiles = tsFiles.concat(await findTypeScriptFiles(fullPath));
    } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
      tsFiles.push(fullPath);
    }
  }

  return tsFiles;
}

async function fixTypeErrors(filePath) {
  console.log(`Processing ${filePath}...`);
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    const prompt = `The following is a TypeScript file with type errors. Fix all type errors without changing the logic, layout, or functionality:
---
${fileContent}
---
Return only the corrected TypeScript file without any additional text or explanations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a TypeScript expert. Fix type errors while preserving the original code's logic and functionality."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
    });

    const fixedContent = response.choices[0].message.content.trim();
    
    // Only write the file if content has changed
    if (fixedContent !== fileContent) {
      await fs.writeFile(filePath, fixedContent, 'utf8');
      console.log(`✅ Fixed type errors in ${filePath}`);
      return true;
    }
    
    console.log(`ℹ️ No changes needed for ${filePath}`);
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
    return false;
  }
}

async function main() {
  try {
    const tsFiles = await findTypeScriptFiles(SRC_DIR);
    console.log(`Found ${tsFiles.length} TypeScript files to process`);

    let modifiedFiles = 0;
    for (const file of tsFiles) {
      const wasModified = await fixTypeErrors(file);
      if (wasModified) modifiedFiles++;
    }

    console.log(`\nSummary:`);
    console.log(`Total files processed: ${tsFiles.length}`);
    console.log(`Files modified: ${modifiedFiles}`);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
