import { Certificate } from '@/shared/types/project';

// Import all certificate images
const certificateImages = import.meta.glob('@/shared/assets/images/certificate/*.png', { eager: true });

// Helper function to get image URL safely
const getImageUrl = (filename: string): string => {
  const key = Object.keys(certificateImages).find(path => path.includes(filename));
  return key ? (certificateImages[key] as { default: string }).default : '';
};

export const certificates: Certificate[] = [
  {
    id: 'amazon-va',
    title: 'Amazon Virtual Assistant Certification',
    image: getImageUrl('amazon-va.png'),
    description: 'Advanced certification in Amazon marketplace management, product optimization, and seller account operations.',
    technologies: ['Amazon Marketplace', 'Inventory Management', 'SEO', 'Analytics'],
    date: '2023',
    issuer: 'Surge Freelancing Marketplace',
    url: 'https://surge.global/certificates/amazon-va'
  },
  {
    id: 'project-management',
    title: 'Project Management Professional (PMP)',
    image: getImageUrl('pmp.png'),
    description: 'Globally recognized certification in project management methodologies and best practices.',
    technologies: ['Project Management', 'Agile', 'Scrum', 'Risk Management'],
    date: '2023',
    issuer: 'Project Management Institute',
    url: 'https://www.pmi.org/certifications/project-management-pmp',
    credentialId: 'PMP-2023-12345'
  },
  {
    id: 'web-development',
    title: 'Full Stack Web Development',
    image: getImageUrl('web-dev.png'),
    description: 'Comprehensive certification in modern web development technologies and practices.',
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    date: '2023',
    issuer: 'Udacity',
    url: 'https://www.udacity.com/certificates/web-dev'
  }
];
