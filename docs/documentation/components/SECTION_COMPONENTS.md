# Section Components

This document outlines the section-specific components used in different parts of the portfolio website.

## Overview
Section components are specialized components designed for specific sections of the website. They combine common components and custom logic to create cohesive user experiences.

## Directory Structure
```
sections/
├── About.tsx          # About section component
├── Certificates/      # Certificates section
├── Contact.tsx        # Contact form component
├── Hero.tsx          # Hero section component
├── Services.tsx      # Services section component
├── TechnicalProjects.tsx # Technical projects showcase
├── about/            # About section utilities
│   ├── PersonalInfo.tsx
│   ├── Skills.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   └── Tools.tsx
├── contact/          # Contact utilities
├── hero/            # Hero utilities
│   ├── HeroContent.tsx
│   └── HeroImage.tsx
├── portfolio/       # Portfolio components
│   ├── ProjectCard.tsx
│   └── ProjectFilter.tsx
└── services/        # Services utilities
```

## Core Section Components

### Hero Section
```typescript
interface HeroProps {
  className?: string;
  id?: string;
}

interface HeroContentProps {
  className?: string;
  id?: string;
}

interface HeroData {
  subtitle: string;
  title: {
    prefix: string;
    name: string;
    suffix?: string;
  };
  description: string;
  technologies: string[];
  cta: {
    primary: {
      text: string;
      href: string;
      icon?: React.ReactNode;
    };
    secondary: {
      text: string;
      href: string;
      icon?: React.ReactNode;
    };
  };
  resume?: {
    text: string;
    href: string;
  };
}
```
- **Purpose**: Landing page hero section with animated introduction
- **Features**:
  - Animated text reveal with motion variants
  - Gradient text effects
  - Technology stack showcase
  - Call-to-action buttons
  - Resume download option
  - Responsive grid layout
  - Reduced motion support
  - Dark mode compatibility
  - Backdrop blur effects
- **Implementation**: 
  - Main component in `Hero.tsx`
  - Supporting components in `hero/` directory:
    - `HeroContent.tsx`: Text and CTA content
    - `HeroImage.tsx`: Hero section image
    - `types.ts`: Type definitions and variants

### About Section
```typescript
interface AboutProps {
  className?: string;
  data: {
    title: string;
    description: string;
    personalInfo: PersonalInfo;
    skills: Skill[];
    education: Education[];
    experience: Experience[];
    tools: Tool[];
  };
}

interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  availability: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface Tool {
  name: string;
  icon: React.ReactNode;
  category: string;
}
```
- **Purpose**: Personal introduction and skills showcase
- **Features**:
  - Personal information display
  - Skills visualization with progress bars
  - Education timeline
  - Professional experience timeline
  - Tools and technologies grid
  - Downloadable resume
- **Implementation**: 
  - Main component in `About.tsx`
  - Supporting components in `about/` directory:
    - `PersonalInfo.tsx`: Displays personal information
    - `Skills.tsx`: Skills visualization with categories
    - `Education.tsx`: Education timeline
    - `Experience.tsx`: Professional experience timeline
    - `Tools.tsx`: Tools and technologies grid

### Services Section
```typescript
interface ServicesProps {
  className?: string;
  data: {
    title: string;
    description: string;
    services: Service[];
  };
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
}
```
- **Purpose**: Display professional services and expertise
- **Features**:
  - Service cards with icons
  - Service descriptions and key features
  - Animated transitions
  - Responsive grid layout
  - Dark mode support
- **Implementation**: 
  - Main component in `Services.tsx`
  - Supporting components in `services/` directory:
    - `ServiceCard.tsx`: Individual service display
    - `ServiceIcon.tsx`: Icon wrapper with animations
    - `ServiceFeatures.tsx`: Features list component

### Contact Section
```typescript
interface ContactProps {
  className?: string;
  data: {
    title: string;
    description: string;
    email: string;
    phone?: string;
    location: string;
    socials: Social[];
  };
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Social {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
```
- **Purpose**: Contact form and social media information
- **Features**:
  - Contact form with validation
  - Social media links with icons
  - Contact information display
  - Form submission handling
  - Loading and error states
  - Success notifications
  - Dark mode support
- **Implementation**: 
  - Main component in `Contact.tsx`
  - Supporting components in `contact/` directory:
    - `ContactForm.tsx`: Form with validation
    - `ContactInfo.tsx`: Contact information display
    - `SocialLinks.tsx`: Social media links grid
    - `FormStatus.tsx`: Form submission status

### Certificates Section
```typescript
interface CertificatesProps extends WithClassName {}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  skills?: string[];
}
```
- **Purpose**: Display professional certifications and achievements
- **Features**:
  - Certificate cards with images
  - Issuer and date information
  - Credential verification links
  - Staggered animation effects
  - Responsive grid layout
  - Hover effects and transitions
  - Dark mode support
  - Image optimization
- **Implementation**: 
  - Main component in `Certificates/Certificates.tsx`
  - Supporting files:
    - `types.ts`: Type definitions
    - `index.ts`: Component exports

### Technical Projects Section
```typescript
interface TechnicalProjectsProps {
  className?: string;
  data: {
    title: string;
    description: string;
    categories: ProjectCategory[];
    projects: Project[];
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: Technology[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links: {
    demo?: string;
    source?: string;
    live?: string;
  };
  featured?: boolean;
}

interface Technology {
  name: string;
  icon?: React.ReactNode;
  version?: string;
}

type ProjectCategory = {
  id: string;
  label: string;
  description?: string;
};
```
- **Purpose**: Showcase technical projects and portfolio items
- **Features**:
  - Project cards with images
  - Category-based filtering
  - Technology stack display
  - Project links (demo, source, live)
  - Featured projects highlighting
  - Responsive masonry grid
  - Image lazy loading
  - Dark mode support
  - Animated transitions
- **Implementation**: 
  - Main component in `TechnicalProjects.tsx`
  - Supporting components in `portfolio/` directory:
    - `ProjectCard.tsx`: Project display card
    - `ProjectFilter.tsx`: Category filtering
    - `TechnologyStack.tsx`: Tech stack display
    - `ProjectLinks.tsx`: Project links component
    - `ProjectImage.tsx`: Optimized image component

## Shared Features

### Common Props
- `className`: Optional styling override for component customization
- `data`: Component-specific data structure
- `children`: Optional child components (where applicable)

### Component Organization
1. **Main Section Components**
   - `Hero.tsx`: Landing page hero section
   - `About.tsx`: About section with personal info
   - `Services.tsx`: Services showcase
   - `Contact.tsx`: Contact form and info
   - `TechnicalProjects.tsx`: Project portfolio
   - `Certificates.tsx`: Certifications display

2. **Supporting Components**
   - `about/`: About section components
   - `contact/`: Contact form components
   - `hero/`: Hero section components
   - `portfolio/`: Project components
   - `services/`: Service components

### Best Practices

#### Performance Optimization
- Lazy loading of images and heavy content
- Code splitting for large components
- Memoization of expensive computations
- Optimized asset delivery
- Efficient state updates

#### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

#### State Management
- Component-level state with React hooks
- Props for configuration
- Context for theme and global state
- Event handlers for user interaction
- Form state management

#### Error Handling
- Form validation with error messages
- Loading states and spinners
- Error boundaries for component failures
- Fallback UI for failed loads
- Network error handling

#### Responsive Design
- Mobile-first approach
- Fluid typography
- Responsive grid layouts
- Adaptive component behavior
- Touch-friendly interactions

## Testing Guidelines

### Unit Tests
```typescript
describe('Section Components', () => {
  describe('About', () => {
    it('renders personal info correctly');
    it('displays skills with proper levels');
    it('shows education timeline');
  });

  describe('Services', () => {
    it('renders service cards');
    it('handles icon animations');
    it('displays features list');
  });

  describe('Contact', () => {
    it('validates form input');
    it('handles form submission');
    it('shows success/error states');
  });

  describe('TechnicalProjects', () => {
    it('filters projects by category');
    it('displays project details');
    it('handles image loading');
  });
});
```

### Integration Tests
```typescript
describe('Section Integration', () => {
  it('maintains state during navigation');
  it('handles form submissions properly');
  it('manages loading states correctly');
  it('preserves filter selections');
});
```

### E2E Tests
```typescript
describe('User Flows', () => {
  it('completes contact form submission');
  it('navigates through project categories');
  it('views project details and links');
});
```

## Usage Examples

### Basic Section Usage
```typescript
// Hero section with animation
<Hero
  data={{
    title: "Hello, I'm John Doe",
    subtitle: "Full Stack Developer",
    description: "Building modern web applications",
    image: {
      src: "/images/hero.webp",
      alt: "John Doe",
    },
    cta: {
      primary: {
        text: "View Projects",
        href: "#projects"
      },
      secondary: {
        text: "Contact Me",
        href: "#contact"
      }
    }
  }}
  className="min-h-screen"
/>

// About section with personal info
<About
  data={aboutData}
  className="py-20"
/>

// Services section with grid
<Services
  data={servicesData}
  className="bg-gray-50 dark:bg-gray-900"
/>

// Contact form with submission
<Contact
  data={contactData}
  onSubmit={async (data) => {
    await submitContactForm(data);
  }}
  className="py-20"
/>

// Projects with filtering
<TechnicalProjects
  data={projectsData}
  className="container mx-auto"
/>

// Certificates section
<Certificates
  data={certificatesData}
  className="py-20"
/>
```

### Component Composition
```typescript
<Section id="about">
  <Container>
    <About data={aboutData}>
      <CustomComponent />
    </About>
  </Container>
</Section>
```

### Dark Mode Support
```typescript
<div className="dark">
  <TechnicalProjects
    data={projectsData}
    className="bg-gray-900 text-white"
  />
</div>
```

### Responsive Layout
```typescript
<Grid cols={{ xs: 1, sm: 2, lg: 3 }}>
  {projectsData.projects.map(project => (
    <ProjectCard
      key={project.id}
      project={project}
      className="h-full"
    />
  ))}
</Grid>
