import { render, screen } from '@testing-library/react';
import Portfolio from '@/modules/portfolio/components/Portfolio';
import { Project, ProjectCategory, ProjectType } from '@/shared/types/project';
import { vi, describe, it, beforeEach, expect } from 'vitest';

// Mock project data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Test Project 1',
    description: 'Test Description 1',
    category: ProjectCategory.WEB_DEVELOPMENT,
    type: ProjectType.WEB_APP,
    technologies: ['React', 'TypeScript'],
    image: '/test-image-1.jpg',
    gallery: ['/gallery-1.jpg', '/gallery-2.jpg'],
    githubUrl: 'https://github.com/test/project1',
    demoUrl: 'https://demo.test/project1'
  },
  {
    id: '2',
    title: 'Test Project 2',
    description: 'Test Description 2',
    category: ProjectCategory.WEB_DEVELOPMENT,
    type: ProjectType.WEB_DESIGN,
    technologies: ['Vue', 'JavaScript'],
    image: '/test-image-2.jpg',
    githubUrl: 'https://github.com/test/project2'
  }
];

// Mock getAnimationVariant
vi.mock('@/shared/utils/helpers', () => ({
  getAnimationVariant: vi.fn(),
}));

describe('Portfolio Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders portfolio section correctly', () => {
    render(<Portfolio projects={mockProjects} />);
    
    // Check for section elements
    expect(screen.getByRole('region', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument();
    
    // Check for project cards
    mockProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it('displays project tags', () => {
    render(<Portfolio projects={mockProjects} />);
    
    // Check for tags
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('renders project links correctly', () => {
    render(<Portfolio projects={mockProjects} />);
    
    // Check for GitHub links
    expect(screen.getAllByRole('link', { name: /github/i })).toHaveLength(2);
    
    // Check for live link (only first project has it)
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', 'https://demo.test/project1');
  });

  it('applies correct animation variants', () => {
    render(<Portfolio projects={mockProjects} />);
    const portfolioSection = screen.getByTestId('portfolio-section');
    expect(portfolioSection).toHaveAttribute('data-motion', 'fade-up');
  });

  it('handles empty projects array', () => {
    render(<Portfolio projects={[]} />);
    expect(screen.getByText(/no projects available/i)).toBeInTheDocument();
  });
});
