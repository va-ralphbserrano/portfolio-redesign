# Contribution Guide

## Overview
This guide outlines the process for contributing to the portfolio project. For detailed coding standards and best practices, please refer to [CODING_STANDARDS.md](./CODING_STANDARDS.md).

## Getting Started

### 1. Development Environment Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-redesign.git
cd portfolio-redesign

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Project Structure
```
portfolio-redesign/
├── src/
│   ├── components/     # React components
│   ├── features/       # Feature modules
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles
│   └── types/         # TypeScript types
├── public/            # Static assets
├── docs/             # Documentation
└── tests/            # Test files
```

## Development Workflow

### 1. Branch Strategy
```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Create a new bugfix branch
git checkout -b fix/bug-description

# Create a new documentation branch
git checkout -b docs/documentation-description
```

### 2. Commit Guidelines
Follow conventional commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test changes
- chore: Build/config changes

Example:
```bash
git commit -m "feat(auth): add OAuth2 authentication"
```

### 3. Code Quality Requirements

#### Testing
- Write unit tests for new components/functions
- Add integration tests for features
- Maintain test coverage above 80%
- Run full test suite before PR
```bash
# Run all tests
npm run test

# Check coverage
npm run test:coverage
```

#### Code Style
- Follow ESLint rules
- Use Prettier formatting
- Follow TypeScript best practices
```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix

# Format code
npm run format
```

### 4. Pull Request Process

1. **Before Creating PR**
   - Update your branch with main
   - Run all tests
   - Check code style
   - Update documentation

2. **PR Requirements**
   - Clear title following commit guidelines
   - Detailed description of changes
   - Link to related issues
   - Screenshots for UI changes
   - List of testing steps

3. **PR Template**
```markdown
## Description
[Description of your changes]

## Related Issue
Fixes #[issue-number]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guidelines
- [ ] Self-review completed
```

### 5. Code Review Process

1. **Review Requirements**
   - At least one approval required
   - All comments must be resolved
   - CI checks must pass
   - Documentation updated

2. **Review Checklist**
   - Code follows standards
   - Tests are adequate
   - Documentation is clear
   - No security issues
   - Performance considered

### 6. After Merge

1. **Clean Up**
   - Delete feature branch
   - Close related issues
   - Update project board

2. **Documentation**
   - Update changelog
   - Update related docs
   - Review API docs

## Best Practices

### 1. Code Organization
- Keep components small and focused
- Use meaningful names
- Follow folder structure
- Maintain separation of concerns

### 2. Performance
- Optimize imports
- Lazy load components
- Use proper React hooks
- Monitor bundle size

### 3. Accessibility
- Follow WCAG guidelines
- Use semantic HTML
- Add ARIA labels
- Test with screen readers

### 4. Security
- Validate inputs
- Sanitize data
- Follow security best practices
- Keep dependencies updated

## Getting Help

1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Create new issue

## Additional Resources

- [React Best Practices](https://reactjs.org/docs/getting-started.html)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
