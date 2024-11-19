import os
import fitz  # PyMuPDF
from pathlib import Path
import concurrent.futures

def convert_pdf_to_image(pdf_path, output_dir):
    try:
        # Get the PDF filename without extension
        pdf_name = Path(pdf_path).stem
        output_path = os.path.join(output_dir, f"{pdf_name}.png")
        
        # Skip if output already exists
        if os.path.exists(output_path):
            print(f"Skipping {pdf_name} - already exists")
            return True
        
        # Open the PDF
        doc = fitz.open(pdf_path)
        
        # Get the first page
        page = doc[0]
        
        # Create a matrix for higher resolution (2x)
        zoom = 2
        mat = fitz.Matrix(zoom, zoom)
        
        # Get the pixmap
        pix = page.get_pixmap(matrix=mat)
        
        # Save the image
        pix.save(output_path)
        
        print(f"Successfully converted {pdf_name}")
        return True
        
    except Exception as e:
        print(f"Error converting {pdf_path}: {str(e)}")
        return False

def main():
    # Define directories
    pdf_dir = "public/pdfs"
    output_dir = "public/images/projects"
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Get all PDF files
    pdf_files = [os.path.join(pdf_dir, f) for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    
    print(f"Found {len(pdf_files)} PDF files to process")
    
    # Process files in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(convert_pdf_to_image, pdf_file, output_dir) 
                  for pdf_file in pdf_files]
        
        # Wait for all tasks to complete
        concurrent.futures.wait(futures)
    
    # Count successful conversions
    successful = sum(1 for future in futures if future.result())
    print(f"\nConversion complete: {successful} out of {len(pdf_files)} files processed successfully")

if __name__ == "__main__":
    main()
