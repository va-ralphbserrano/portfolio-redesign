import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../src/assets/JBY');
const PUBLIC_DIR = path.join(__dirname, '../public');
const PDF_DIR = path.join(PUBLIC_DIR, 'pdfs');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'images/projects/thumbnails');

// Create necessary directories
function createDirectories() {
  [PDF_DIR, THUMBNAILS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate thumbnail from first page of PDF
async function generateThumbnail(pdfPath, outputPath) {
  try {
    await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([
        {
          input: Buffer.from(`
            <svg width="800" height="600">
              <rect width="800" height="600" fill="#f0f0f0"/>
              <text x="400" y="300" font-family="Arial" font-size="24" text-anchor="middle">
                ${path.basename(pdfPath, '.pdf')}
              </text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
      ])
      .jpeg()
      .toFile(outputPath);
  } catch (error) {
    console.error(`Error generating thumbnail for ${pdfPath}:`, error);
  }
}

// Copy PDF files and generate thumbnails
async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      // Process subdirectories
      const pdfFiles = fs.readdirSync(sourcePath).filter(file => file.endsWith('.pdf'));
      
      for (const pdfFile of pdfFiles) {
        const pdfSourcePath = path.join(sourcePath, pdfFile);
        const pdfDestPath = path.join(PDF_DIR, entry.name, pdfFile);
        
        // Create project-specific directory in PDF_DIR
        if (!fs.existsSync(path.dirname(pdfDestPath))) {
          fs.mkdirSync(path.dirname(pdfDestPath), { recursive: true });
        }
        
        // Copy PDF file
        fs.copyFileSync(pdfSourcePath, pdfDestPath);
        
        // Generate thumbnail
        const thumbnailName = entry.name.toLowerCase().replace(/\s+/g, '-') + '-thumb.jpg';
        const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);
        await generateThumbnail(pdfSourcePath, thumbnailPath);
        
        console.log(`Processed: ${entry.name}/${pdfFile}`);
      }
    } else if (entry.name.endsWith('.pdf')) {
      // Copy standalone PDF file
      const pdfDestPath = path.join(PDF_DIR, entry.name);
      fs.copyFileSync(sourcePath, pdfDestPath);
      
      // Generate thumbnail
      const thumbnailName = entry.name.replace('.pdf', '').toLowerCase().replace(/\s+/g, '-') + '-thumb.jpg';
      const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);
      await generateThumbnail(sourcePath, thumbnailPath);
      
      console.log(`Processed: ${entry.name}`);
    }
  }
}

async function main() {
  try {
    console.log('Creating directories...');
    createDirectories();
    
    console.log('Processing files...');
    await processDirectory(SOURCE_DIR);
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
