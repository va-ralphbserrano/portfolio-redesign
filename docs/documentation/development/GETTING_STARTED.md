# Getting Started

## Prerequisites
- Node.js (v18+)
- npm or yarn
- Git
- VS Code (recommended)

## Quick Start

1. **Clone the Repository**
```bash
git clone [repository-url]
cd portfolio-redesign
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
code .env
```

4. **Start Development Server**
```bash
npm run dev
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run tests
npm run test           # Unit tests
npm run test:e2e      # E2E tests
npm run test:coverage # Coverage report

# Linting and formatting
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Run Prettier
```

## Project Structure
```
portfolio-redesign/
├── src/
│   ├── components/  # Reusable UI components
│   ├── features/    # Feature modules
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Utility functions
│   ├── styles/      # Global styles
│   └── types/       # TypeScript types
├── public/          # Static assets
├── docs/           # Documentation
└── tests/          # Test files
```

## Next Steps

1. **Review Documentation**
   - Check out our [Development Environment](./DEVELOPMENT_ENVIRONMENT.md) guide for detailed setup
   - Read our [Coding Standards](./CODING_STANDARDS.md)
   - Learn about our [Contribution Guidelines](./CONTRIBUTION_GUIDE.md)
   - Review [Troubleshooting](./TROUBLESHOOTING.md) for common issues
   - Check [FAQ](./FAQ.md) for quick answers

2. **Development Workflow**
   - Create a new branch for your work
   - Make changes following our coding standards
   - Write/update tests as needed
   - Submit a PR following our contribution guidelines

3. **Testing Requirements**
   - Unit tests for new components/functions
   - E2E tests for critical user flows
   - Maintain >80% test coverage
   - All tests must pass before PR submission

## Common Issues and Solutions

See our [Troubleshooting Guide](./TROUBLESHOOTING.md) for detailed solutions to common issues.

## Need Help?

1. Check the [FAQ](./FAQ.md)
2. Search existing GitHub issues
3. Review [Troubleshooting Guide](./TROUBLESHOOTING.md)
4. Create a new GitHub issue if needed
