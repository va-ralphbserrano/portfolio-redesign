import * as pdfjsLib from 'pdfjs-dist';
import { createCanvas } from 'canvas';
import fs from 'fs/promises';
import path from 'path';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const sourceDir = 'public/pdfs/conveyor';
const targetDir = 'src/assets/images/projects';

async function convertPDFToImage(pdfPath, outputPath) {
  // Load the PDF file
  const data = await fs.readFile(pdfPath);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const page = await pdf.getPage(1);

  // Set up canvas with desired dimensions
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');

  // Render PDF page to canvas
  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;

  // Save canvas as PNG
  const buffer = canvas.toBuffer('image/png');
  await fs.writeFile(outputPath, buffer);
}

async function convertPDFs() {
  try {
    // Read all PDF files
    const files = await fs.readdir(path.join(process.cwd(), sourceDir));
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(process.cwd(), sourceDir, pdfFile);
      const imageName = pdfFile.replace('.pdf', '.png');
      const imagePath = path.join(process.cwd(), targetDir, imageName);

      await convertPDFToImage(pdfPath, imagePath);
      console.log(`Converted ${pdfFile} to ${imageName}`);
    }
  } catch (error) {
    console.error('Error converting PDFs:', error);
  }
}

convertPDFs();
