import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../src/assets/JBY');
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.ts');

function getProjectType(directory) {
  try {
    const files = fs.readdirSync(directory);
    return files.some(file => file.endsWith('.ipt') || file.endsWith('.iam')) 
      ? 'inventor' 
      : 'autocad';
  } catch {
    return 'autocad'; // Default to AutoCAD for standalone files
  }
}

function generateProjectDescription(name, category) {
  const baseDesc = category === 'inventor' 
    ? '3D modeling and assembly design'
    : 'Technical drawing and design';
  
  const keywords = {
    rack: 'storage solution with optimized space utilization',
    tank: 'industrial fluid storage system with precise specifications',
    hood: 'ventilation system with airflow optimization',
    ducting: 'HVAC system with efficient air distribution',
    grates: 'industrial grade steel grating system',
    door: 'custom steel door with ventilation features',
    platform: 'industrial equipment support structure',
    pipe: 'fluid transport system assembly',
    signage: 'custom signage solution',
    flange: 'precision-engineered connection component',
    mixer: 'industrial mixing equipment',
    table: 'custom workspace solution',
  };

  const nameLower = name.toLowerCase();
  for (const [keyword, description] of Object.entries(keywords)) {
    if (nameLower.includes(keyword)) {
      return `${baseDesc} for ${description}`;
    }
  }
  
  return `${baseDesc} with detailed specifications and measurements`;
}

function getTags(name, category) {
  const tags = [category.toUpperCase()];
  
  if (category === 'inventor') {
    tags.push('3D Modeling', 'Assembly Design');
  } else {
    tags.push('Technical Drawing', '2D Design');
  }
  
  const tagMappings = {
    rack: ['Storage Solutions', 'Industrial Design'],
    tank: ['Fluid Systems', 'Industrial Equipment'],
    hood: ['HVAC', 'Ventilation'],
    ducting: ['HVAC', 'Ventilation'],
    grates: ['Steel Fabrication', 'Industrial'],
    door: ['Steel Fabrication', 'Building Components'],
    platform: ['Industrial Equipment', 'Support Structures'],
    pipe: ['Fluid Systems', 'Assembly Design'],
    signage: ['Commercial', 'Visual Design'],
    flange: ['Mechanical Components', 'Precision Engineering'],
    mixer: ['Industrial Equipment', 'Process Machinery'],
    table: ['Furniture Design', 'Commercial'],
  };

  const nameLower = name.toLowerCase();
  for (const [keyword, keywordTags] of Object.entries(tagMappings)) {
    if (nameLower.includes(keyword)) {
      tags.push(...keywordTags);
    }
  }
  
  return [...new Set(tags)]; // Remove duplicates
}

function formatProjectTitle(name) {
  return name
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\.pdf$/, '') // Remove .pdf extension
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

function generateProjectData() {
  const projects = [];
  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });
  
  let id = 1;
  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const projectPath = path.join(SOURCE_DIR, entry.name);
      const category = getProjectType(projectPath);
      const pdfFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.pdf'));
      
      pdfFiles.forEach(pdfFile => {
        const title = formatProjectTitle(entry.name);
        projects.push({
          id: String(id++),
          title,
          description: generateProjectDescription(entry.name, category),
          thumbnail: `/images/projects/thumbnails/${entry.name.toLowerCase().replace(/\s+/g, '-')}-thumb.jpg`,
          pdfUrl: `/pdfs/${entry.name}/${pdfFile}`,
          category,
          tags: getTags(entry.name, category)
        });
      });
    } else if (entry.name.endsWith('.pdf')) {
      const name = entry.name.replace('.pdf', '');
      const title = formatProjectTitle(name);
      const category = 'autocad';
      
      projects.push({
        id: String(id++),
        title,
        description: generateProjectDescription(name, category),
        thumbnail: `/images/projects/thumbnails/${name.toLowerCase().replace(/\s+/g, '-')}-thumb.jpg`,
        pdfUrl: `/pdfs/${entry.name}`,
        category,
        tags: getTags(name, category)
      });
    }
  });
  
  // Generate TypeScript file content
  const fileContent = `// This file is auto-generated. Do not edit manually.
import { Project } from '@/components/sections/portfolio/ProjectGallery';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

// Helper function to get projects by category
export const getProjectsByCategory = (category: 'all' | 'autocad' | 'inventor') => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get unique tags
export const getUniqueTags = () => {
  const tags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};`;

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`Generated project data with ${projects.length} entries`);
}

generateProjectData();
