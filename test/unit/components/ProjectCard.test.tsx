import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/common/ProjectCard';
import { Project, ProjectCategory, ProjectType } from '@/shared/types/project';

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'Test Description',
  category: ProjectCategory.WEB_DEVELOPMENT,
  type: ProjectType.WEB_APP,
  technologies: ['React', 'TypeScript'],
  image: '/test-image.jpg',
  gallery: ['/gallery-1.jpg', '/gallery-2.jpg'],
  imageLabels: ['Main Image', 'Gallery 1', 'Gallery 2'],
  githubUrl: 'https://github.com/test/project',
  demoUrl: 'https://demo.test/project'
};

describe('ProjectCard Component', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProject.title)).toHaveAttribute('src', mockProject.image);
  });

  it('renders technologies correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders links correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', mockProject.githubUrl);
    expect(screen.getByRole('link', { name: /demo/i })).toHaveAttribute('href', mockProject.demoUrl);
  });

  it('renders without demo link when demoUrl is not provided', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectCard project={projectWithoutDemo} />);
    
    expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument();
  });

  it('renders without github link when githubUrl is not provided', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectCard project={projectWithoutGithub} />);
    
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
  });
});
