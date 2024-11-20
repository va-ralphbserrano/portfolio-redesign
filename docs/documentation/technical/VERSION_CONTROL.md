# Version Control Configuration Documentation

## Overview
This project uses Git for version control with specific configurations and workflows to ensure code quality and maintainable history. The setup includes commit message standards, branch management, and integration with development tools.

## Git Configuration

### Core Settings
```bash
# Line endings
core.autocrlf=true     # Windows
core.eol=lf           # Enforce LF in repository

# File handling
core.ignorecase=true
core.fileMode=false    # Windows
```

### Commit Message Configuration
Using Commitlint to enforce conventional commits:

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
```

## Branch Management

### Branch Structure
```
main
├── develop
│   ├── feature/*
│   ├── bugfix/*
│   └── hotfix/*
└── release/*
```

### Branch Naming Convention
- `feature/*`: New features (e.g., feature/add-dark-mode)
- `bugfix/*`: Bug fixes (e.g., bugfix/fix-navigation)
- `hotfix/*`: Critical fixes (e.g., hotfix/security-patch)
- `release/*`: Release branches (e.g., release/v1.2.0)

## Git Hooks

### Pre-commit Hook
```bash
#!/bin/sh
# .husky/pre-commit

npm run lint
npm run format
npm run test
```

### Commit Message Hook
```bash
#!/bin/sh
# .husky/commit-msg

npx --no -- commitlint --edit $1
```

### Push Hook
```bash
#!/bin/sh
# .husky/pre-push

npm run test:coverage
npm run build
```

## Ignored Files

### .gitignore Configuration
```plaintext
# Dependencies
node_modules/
.pnp/
.pnp.js

# Testing
coverage/
.nyc_output/

# Production
build/
dist/
out/

# Development
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Integration

### 1. GitHub Actions
```yaml
name: CI
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

### 2. Pull Request Template
```markdown
## Description
[Description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests passing
```

## Best Practices

### 1. Commit Guidelines
- Use conventional commit messages
- Keep commits focused and atomic
- Include relevant ticket numbers
- Write clear descriptions

### 2. Branch Management
- Keep branches up to date
- Delete merged branches
- Use meaningful branch names
- Regular rebasing on develop

### 3. Code Review
- Review before merge
- Use pull request template
- Address all comments
- Maintain clean history

## Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout develop
git pull
git checkout -b feature/new-feature

# Development cycle
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request
# Review and merge
```

### 2. Release Process
```bash
# Create release branch
git checkout develop
git checkout -b release/v1.0.0

# Version bump and changelog
npm version 1.0.0
git add .
git commit -m "chore: bump version to 1.0.0"

# Merge to main
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags
```

## Troubleshooting

### Common Issues

1. **Line Ending Issues**
   ```bash
   # Fix line endings
   git config --global core.autocrlf true
   git rm --cached -r .
   git reset --hard
   ```

2. **Commit Hook Failures**
   ```bash
   # Skip hooks temporarily
   git commit --no-verify
   
   # Fix linting issues
   npm run lint:fix
   ```

3. **Branch Management**
   ```bash
   # Update stale branch
   git checkout feature/branch
   git fetch origin
   git rebase origin/develop
   ```

## Security

### 1. Sensitive Data
- Use .gitignore for sensitive files
- Store secrets in environment variables
- Use secret management in CI/CD

### 2. Access Control
- Protected branches
- Required reviews
- Signed commits recommended

## Maintenance

### Regular Tasks
1. Clean up merged branches
2. Update dependencies
3. Review and update workflows
4. Audit access and permissions

### Automated Tasks
1. Dependency updates (Dependabot)
2. Branch cleanup
3. Security scanning
4. Code quality checks
