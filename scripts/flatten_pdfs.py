import os
import shutil
from pathlib import Path

def flatten_pdfs(pdfs_dir):
    # Convert to Path object for easier manipulation
    pdfs_path = Path(pdfs_dir)
    
    # Keep track of moved files for reporting
    moved_files = []
    
    # Walk through all subdirectories
    for root, dirs, files in os.walk(pdfs_path):
        # Skip the root directory itself
        if root == str(pdfs_path):
            continue
            
        for file in files:
            if file.lower().endswith('.pdf'):
                # Get source and destination paths
                source = Path(root) / file
                # Create a unique name by prefixing with directory name if from subdirectory
                dir_name = Path(root).name
                new_name = f"{dir_name}-{file}" if root != str(pdfs_path) else file
                destination = pdfs_path / new_name
                
                # Move the file
                shutil.move(str(source), str(destination))
                moved_files.append((str(source), str(destination)))
    
    # Remove empty directories
    for root, dirs, files in os.walk(pdfs_path, topdown=False):
        for dir_name in dirs:
            dir_path = Path(root) / dir_name
            try:
                dir_path.rmdir()  # This will only remove empty directories
            except OSError:
                pass  # Directory not empty or other error
    
    return moved_files

if __name__ == "__main__":
    pdfs_dir = r"D:\Github\portfolio-redesign\public\pdfs"
    moved_files = flatten_pdfs(pdfs_dir)
    
    print("\nMoved the following files:")
    for source, dest in moved_files:
        print(f"Moved: {source} -> {dest}")
