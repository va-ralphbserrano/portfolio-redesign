import os
from pdf2image import convert_from_path
import re

def sanitize_filename(filename):
    # Remove the extension and convert to lowercase
    base = os.path.splitext(filename)[0].lower()
    # Replace spaces and special characters with hyphens
    sanitized = re.sub(r'[^a-z0-9]+', '-', base)
    # Remove leading/trailing hyphens
    sanitized = sanitized.strip('-')
    return sanitized + '-thumb.jpg'

def convert_pdfs_to_images():
    pdf_dir = 'public/pdfs'
    img_dir = 'public/images/projects'
    poppler_path = 'C:\\poppler\\Library\\bin'
    
    # Create the output directory if it doesn't exist
    os.makedirs(img_dir, exist_ok=True)
    
    # Get all PDF files in the directory
    pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    
    for pdf_file in pdf_files:
        try:
            # Convert the first page of each PDF to image
            images = convert_from_path(
                os.path.join(pdf_dir, pdf_file),
                first_page=1,
                last_page=1,
                dpi=150,  # Lower DPI for thumbnails
                poppler_path=poppler_path
            )
            
            if images:
                # Save the first page as JPG
                output_file = sanitize_filename(pdf_file)
                images[0].save(os.path.join(img_dir, output_file), 'JPEG', quality=80)
                print(f'Converted {pdf_file} to {output_file}')
        except Exception as e:
            print(f'Error converting {pdf_file}: {str(e)}')

if __name__ == '__main__':
    convert_pdfs_to_images()
