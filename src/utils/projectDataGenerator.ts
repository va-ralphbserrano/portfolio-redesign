import fs from 'fs';
import path from 'path';

interface ProjectFile {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  pdfUrl: string;
  category: 'autocad' | 'inventor' | 'all';
  tags: string[];
}

function getProjectType(directory: string): 'autocad' | 'inventor' {
  const files = fs.readdirSync(directory);
  return files.some(file => file.endsWith('.ipt') || file.endsWith('.iam')) 
    ? 'inventor' 
    : 'autocad';
}

function generateThumbnailName(projectName: string): string {
  return projectName.toLowerCase().replace(/\s+/g, '-') + '-thumb.jpg';
}

function formatProjectTitle(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .trim();
}

function generateProjectDescription(name: string, category: 'autocad' | 'inventor'): string {
  const baseDesc = category === 'inventor' 
    ? '3D modeling and assembly design'
    : 'Technical drawing and design';
  
  // Add specific descriptions based on project name
  if (name.toLowerCase().includes('rack')) {
    return `${baseDesc} for custom storage solution with optimized space utilization`;
  }
  if (name.toLowerCase().includes('tank')) {
    return `${baseDesc} for industrial fluid storage system with precise specifications`;
  }
  if (name.toLowerCase().includes('hood')) {
    return `${baseDesc} for ventilation system with airflow optimization`;
  }
  if (name.toLowerCase().includes('ducting')) {
    return `${baseDesc} for HVAC system with efficient air distribution`;
  }
  if (name.toLowerCase().includes('grates')) {
    return `${baseDesc} for industrial grade steel grating system`;
  }
  
  return `${baseDesc} with detailed specifications and measurements`;
}

function getTags(projectName: string, category: 'autocad' | 'inventor'): string[] {
  const tags: string[] = [category.toUpperCase()];
  
  // Add category-specific tags
  if (category === 'inventor') {
    tags.push('3D Modeling', 'Assembly Design');
  } else {
    tags.push('Technical Drawing', '2D Design');
  }
  
  // Add specific tags based on project name
  if (projectName.toLowerCase().includes('rack')) {
    tags.push('Storage Solutions', 'Industrial Design');
  }
  if (projectName.toLowerCase().includes('tank')) {
    tags.push('Fluid Systems', 'Industrial Equipment');
  }
  if (projectName.toLowerCase().includes('hood') || projectName.toLowerCase().includes('ducting')) {
    tags.push('HVAC', 'Ventilation');
  }
  if (projectName.toLowerCase().includes('kitchen')) {
    tags.push('Kitchen Equipment', 'Commercial');
  }
  if (projectName.toLowerCase().includes('grates')) {
    tags.push('Steel Fabrication', 'Industrial');
  }
  
  return tags;
}

export function generateProjectData(baseDir: string): ProjectFile[] {
  const projects: ProjectFile[] = [];
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  
  let id = 1;
  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const projectPath = path.join(baseDir, entry.name);
      const category = getProjectType(projectPath);
      const pdfFile = fs.readdirSync(projectPath).find(file => file.endsWith('.pdf'));
      
      if (pdfFile) {
        const thumbnailName = generateThumbnailName(entry.name);
        projects.push({
          id: String(id++),
          title: formatProjectTitle(entry.name),
          description: generateProjectDescription(entry.name, category),
          thumbnail: `/images/projects/thumbnails/${thumbnailName}`,
          pdfUrl: `/pdfs/${entry.name}/${pdfFile}`,
          category,
          tags: getTags(entry.name, category)
        });
      }
    } else if (entry.name.endsWith('.pdf')) {
      // Handle standalone PDF files
      const name = entry.name.replace('.pdf', '');
      projects.push({
        id: String(id++),
        title: formatProjectTitle(name),
        description: generateProjectDescription(name, 'autocad'),
        thumbnail: `/images/projects/thumbnails/${generateThumbnailName(name)}`,
        pdfUrl: `/pdfs/${entry.name}`,
        category: 'autocad',
        tags: getTags(name, 'autocad')
      });
    }
  });
  
  return projects;
}

// Example usage:
// const projects = generateProjectData('path/to/JBY/directory');
