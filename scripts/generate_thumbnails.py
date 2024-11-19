import os
import fitz  # PyMuPDF
from PIL import Image
import glob
import io

# Get absolute path to poppler
# POPPLER_PATH = os.path.abspath("poppler/Library/bin")

def create_thumbnail(pdf_path, output_path, size=(800, 600)):
    try:
        # Open the PDF
        doc = fitz.open(pdf_path)
        # Get the first page
        page = doc[0]
        # Set the zoom factors
        zoom = 2  # zoom factor
        mat = fitz.Matrix(zoom, zoom)
        # Get the pixmap (image)
        pix = page.get_pixmap(matrix=mat)
        
        # Convert to PIL Image
        img_data = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_data))
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize maintaining aspect ratio
        img.thumbnail(size, Image.Resampling.LANCZOS)
        
        # Save as JPEG
        img.save(output_path, 'JPEG', quality=85)
        print(f"Created thumbnail for {pdf_path}")
        
        # Close the PDF
        doc.close()
        return True
    except Exception as e:
        print(f"Error processing {pdf_path}: {str(e)}")
    return False

def process_pdfs(pdf_dir, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Process PDF files in root directory
    for pdf_file in glob.glob(os.path.join(pdf_dir, "*.pdf")):
        base_name = os.path.splitext(os.path.basename(pdf_file))[0].lower()
        thumb_name = f"{base_name}-thumb.jpg"
        output_path = os.path.join(output_dir, thumb_name)
        if not os.path.exists(output_path):  # Only create if doesn't exist
            create_thumbnail(pdf_file, output_path)
        else:
            print(f"Thumbnail already exists for {base_name}")
    
    # Process PDF files in subdirectories
    for subdir in os.listdir(pdf_dir):
        subdir_path = os.path.join(pdf_dir, subdir)
        if os.path.isdir(subdir_path):
            # Look for PDFs in the subdirectory
            pdfs = glob.glob(os.path.join(subdir_path, "*.pdf"))
            if pdfs:  # Only process if there are PDFs
                # Use the first PDF in the directory
                pdf_file = pdfs[0]
                # Use the directory name for the thumbnail
                thumb_name = f"{subdir.lower().replace(' ', '-')}-thumb.jpg"
                output_path = os.path.join(output_dir, thumb_name)
                if not os.path.exists(output_path):  # Only create if doesn't exist
                    create_thumbnail(pdf_file, output_path)
                else:
                    print(f"Thumbnail already exists for {subdir}")

if __name__ == "__main__":
    pdf_dir = "D:/Github/portfolio-redesign/public/pdfs"
    output_dir = "D:/Github/portfolio-redesign/public/images/projects/thumbnails"
    process_pdfs(pdf_dir, output_dir)
