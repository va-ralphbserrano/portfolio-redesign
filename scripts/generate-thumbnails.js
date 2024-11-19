const fs = require('fs');
const path = require('path');
const pdf2img = require('pdf-page-counter');
const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');

const PUBLIC_DIR = path.join(__dirname, '../public');
const PDF_DIR = path.join(PUBLIC_DIR, 'pdfs');
const THUMBNAIL_DIR = path.join(PUBLIC_DIR, 'images/projects/thumbnails');

// Create thumbnails directory if it doesn't exist
if (!fs.existsSync(THUMBNAIL_DIR)) {
  fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

async function generateThumbnail(pdfPath, outputPath) {
  try {
    // Get PDF data
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf2img(dataBuffer);
    
    // Create a canvas with specific dimensions
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    
    // Draw PDF preview
    const image = await loadImage(data.base64);
    ctx.drawImage(image, 0, 0, 800, 600);
    
    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png');
    
    // Resize and save as JPEG
    await sharp(buffer)
      .resize(400, 300)
      .jpeg({ quality: 80 })
      .toFile(outputPath);
      
    console.log(`Generated thumbnail for ${path.basename(pdfPath)}`);
  } catch (error) {
    console.error(`Error generating thumbnail for ${path.basename(pdfPath)}:`, error);
  }
}

async function main() {
  // Get all PDF files
  const pdfFiles = fs.readdirSync(PDF_DIR)
    .filter(file => file.toLowerCase().endsWith('.pdf'));
  
  // Generate thumbnails for each PDF
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(PDF_DIR, pdfFile);
    const thumbnailName = path.basename(pdfFile, '.pdf') + '-thumb.jpg';
    const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName);
    
    // Only generate if thumbnail doesn't exist
    if (!fs.existsSync(thumbnailPath)) {
      await generateThumbnail(pdfPath, thumbnailPath);
    }
  }
}

main().catch(console.error);
