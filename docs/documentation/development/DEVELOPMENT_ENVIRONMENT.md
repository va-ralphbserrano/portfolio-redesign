# Development Environment Guide

This guide provides detailed information about setting up and maintaining your development environment for the portfolio project.

## Development Tools

### Required Tools
- **Node.js (v18+)**: JavaScript runtime
  - Use nvm for version management
  - Required for running the application
- **npm/yarn**: Package manager
  - npm v8+ recommended
  - Used for dependency management
- **Git**: Version control
  - Latest version recommended
  - Required for code management
- **VS Code**: Recommended IDE
  - Configured workspace settings provided
  - Extensions list maintained in `.vscode`
- **Docker**: Optional for containerization
  - Required only for container-based development
  - See `docker-compose.yml` for configuration

### VS Code Extensions
- ESLint: JavaScript linting
- Prettier: Code formatting
- TypeScript and JavaScript Language Features
- Error Lens: Inline error display
- GitLens: Git integration
- Auto Import: Import management
- Jest Runner: Test execution
- Docker: Container management
- Live Share: Collaborative coding

### Browser Extensions
- React Developer Tools
- Redux DevTools
- Lighthouse
- axe DevTools (Accessibility)

## Environment Configuration

### Environment Variables
```typescript
// .env.example structure
NEXT_PUBLIC_API_URL=string          // API endpoint URL
NEXT_PUBLIC_EMAILJS_SERVICE_ID=string    // EmailJS service ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=string   // EmailJS template ID
NEXT_PUBLIC_EMAILJS_USER_ID=string       // EmailJS user ID
NEXT_PUBLIC_GA_ID=string                 // Google Analytics ID
```

### TypeScript Configuration
```json
// tsconfig.json key settings
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "module": "esnext",
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### ESLint Configuration
```json
// .eslintrc key settings
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

## Development Server

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Docker Development
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Testing Environment

### Test Configuration
```bash
# Jest configuration
npm run test

# Cypress configuration
npm run test:e2e

# Coverage reports
npm run test:coverage
```

### CI/CD Pipeline
- GitHub Actions for CI/CD
- Automated testing on PR
- Deployment to staging/production
- Performance monitoring

## Debugging Tools

### VS Code Debugging
- Built-in debugger configuration
- Chrome DevTools integration
- React Developer Tools

### Performance Monitoring
- Lighthouse reports
- Web Vitals tracking
- Error monitoring

## Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update documentation

### Troubleshooting
See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.
