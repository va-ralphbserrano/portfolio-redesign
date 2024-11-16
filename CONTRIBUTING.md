# Contributing to Ralph Bernard Serrano's Portfolio

Thank you for considering contributing to my portfolio website! This document outlines the process and guidelines for contributing.

## Code of Conduct

By participating in this project, you agree to abide by its terms and maintain a respectful and inclusive environment for everyone.

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/improvement`)
7. Create a Pull Request

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Before committing:
   ```bash
   npm run typecheck
   npm run lint
   ```

## Pull Request Guidelines

- Update documentation if needed
- Add tests if applicable
- Follow the existing code style
- Keep pull requests focused in scope
- Welcome feedback and be open to improvements

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

Example:
```
feat: add dark mode toggle
```

## Development Guidelines

### Code Style

- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful comments
- Keep components focused

### Components

- Use functional components
- Implement proper TypeScript types
- Follow React best practices
- Keep components small and reusable
- Use proper naming conventions

### Testing

- Write unit tests for new features
- Ensure existing tests pass
- Test across different browsers
- Check mobile responsiveness

## Questions?

Feel free to open an issue or contact me directly.

Thank you for contributing! 🎉
