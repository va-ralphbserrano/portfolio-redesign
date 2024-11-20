# Project Structure

## Directory Layout

```
src/
├── animations/          # Animation configurations
├── assets/             # Static assets
├── components/         # React components
│   ├── common/         # Common components (Navbar, RouteWrapper)
│   ├── icons/          # Icon components
│   ├── layout/         # Layout components (Footer)
│   ├── sections/       # Main sections
│   │   ├── About.tsx   # About section
│   │   ├── Certificates/ # Certificates section
│   │   ├── Contact.tsx # Contact section
│   │   ├── Hero.tsx   # Hero section
│   │   ├── Services.tsx # Services section
│   │   ├── TechnicalProjects.tsx # Technical projects
│   │   ├── about/     # About utilities
│   │   ├── contact/   # Contact utilities
│   │   ├── hero/      # Hero utilities
│   │   ├── portfolio/ # Portfolio components
│   │   └── services/  # Services utilities
│   └── MonitoringDashboard/ # System monitoring
├── config/             # Configuration files
├── context/            # Core contexts
│   └── PDFContext.tsx # PDF handling context
├── contexts/           # Feature contexts
├── data/              # Static data
├── favicon/           # Favicon assets
├── hooks/             # Custom hooks
├── lib/               # Library integrations
├── providers/         # Provider components
├── routes/            # Route components
├── services/          # Service integrations
│   ├── AlertingService.ts      # Alert management
│   ├── ErrorReportingService.ts # Error handling
│   ├── MetricCollectionService.ts # Performance metrics
│   └── MonitoringService.ts    # System monitoring
├── styles/            # Global styles
├── tests/             # Test files
│   ├── components/    # Component tests
│   ├── services/     # Service tests
│   ├── integration/  # Integration tests
│   ├── performance/  # Performance tests
│   ├── utils/       # Test utilities
│   └── setup/       # Test setup
├── types/             # TypeScript types
└── utils/             # Utility functions
    ├── monitoring/   # Monitoring utilities
    └── paths/       # Path management

public/                # Public assets
├── fonts/            # Web fonts
├── images/           # Static images
└── models/           # 3D models
```

## Key Files

### Root Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration
- `vitest.config.ts` - Vitest configuration
- `tailwind.config.cjs` - Tailwind CSS configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `manifest.json` - PWA manifest

### Core Files
- `src/App.tsx` - App entry point
- `src/main.tsx` - Application bootstrap
- `src/sw.js` - Service worker
- `src/manifest.json` - PWA manifest
- `src/robots.txt` - SEO configuration
- `src/sitemap.xml` - Site structure

### Component Organization

#### Single File Components
Components that are self-contained in a single file:
```
components/
├── sections/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   └── TechnicalProjects.tsx
```

#### Directory-based Components
Components that require additional utilities or sub-components:
```
components/
├── sections/
│   ├── Certificates/
│   │   ├── CertificateCard.tsx
│   │   └── CertificateViewer.tsx
│   └── portfolio/
│       ├── ProjectCard.tsx
│       └── ProjectFilter.tsx
```

### Service Organization
Services follow a consistent pattern:
```
services/
├── AlertingService.ts
├── ErrorReportingService.ts
├── MetricCollectionService.ts
└── MonitoringService.ts
```

## Best Practices

### File Organization
- Group related components in directories
- Keep component files focused
- Use consistent naming conventions
- Maintain clear separation of concerns

### Component Structure
- Implement proper TypeScript interfaces
- Follow React best practices
- Use consistent styling patterns
- Handle errors appropriately

### Service Implementation
- Follow singleton pattern
- Implement proper error handling
- Use TypeScript for type safety
- Document public interfaces

### Testing
- Co-locate test files with implementation
- Follow test organization structure
- Implement comprehensive test coverage
- Use appropriate test utilities

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Maintain consistent naming
- Document complex logic

### Performance
- Implement code splitting
- Optimize bundle size
- Use proper lazy loading
- Monitor performance metrics

### Security
- Validate user input
- Sanitize data output
- Follow security best practices
- Implement proper error handling

### Accessibility
- Use semantic HTML
- Implement ARIA labels
- Support keyboard navigation
- Test with screen readers
