const fs = require('fs');
const path = require('path');
const pdf2img = require('pdf-img-convert');

async function convertPDFsToImages() {
    const pdfDir = path.join(__dirname, '..', 'public', 'pdfs', 'conveyor');
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'projects', 'conveyor');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get all PDF files
    const pdfFiles = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));

    for (const pdfFile of pdfFiles) {
        const pdfPath = path.join(pdfDir, pdfFile);
        const outputBase = path.join(outputDir, pdfFile.replace('.pdf', ''));

        try {
            const pdfArray = await pdf2img.convert(pdfPath, {
                width: 1920,
                height: 1080,
                page_numbers: [1]
            });

            // Save the first page as PNG
            fs.writeFileSync(`${outputBase}.png`, pdfArray[0]);
            console.log(`Converted ${pdfFile} to PNG`);
        } catch (error) {
            console.error(`Error converting ${pdfFile}:`, error);
        }
    }
}

convertPDFsToImages().catch(console.error);
