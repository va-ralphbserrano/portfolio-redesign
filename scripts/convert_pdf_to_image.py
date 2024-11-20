import os
import subprocess

def convert_pdfs_to_images():
    # Define directories
    pdf_dir = os.path.join('public', 'pdfs', 'conveyor')
    output_dir = os.path.join('public', 'images', 'projects', 'conveyor')
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Convert each PDF
    for pdf_file in os.listdir(pdf_dir):
        if pdf_file.endswith('.pdf'):
            pdf_path = os.path.join(pdf_dir, pdf_file)
            output_base = os.path.join(output_dir, pdf_file[:-4])  # Remove .pdf extension
            
            try:
                # Convert first page of PDF to PNG using ImageMagick
                subprocess.run([
                    'magick',
                    'convert',
                    '-density', '300',
                    '-quality', '100',
                    f'{pdf_path}[0]',
                    f'{output_base}.png'
                ])
                print(f"Converted {pdf_file} to PNG")
            except Exception as e:
                print(f"Error converting {pdf_file}: {str(e)}")

if __name__ == "__main__":
    convert_pdfs_to_images()
