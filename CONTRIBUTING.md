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
   npm run build
   ```

## Pull Request Guidelines

- Update documentation if needed
- Add tests if applicable
- Follow the existing code style
- Keep pull requests focused in scope
- Welcome feedback and be open to improvements
- Ensure type safety
- Test performance impact

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance
- `perf:` Performance improvements
- `security:` Security enhancements

Example:
```
feat: add dark mode toggle with theme persistence
```

## Development Guidelines

### Code Style

- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful comments
- Keep components focused
- Ensure type safety
- Follow DRY principle

### Components

- Use functional components
- Implement proper TypeScript types
- Follow React best practices
- Keep components small and reusable
- Use proper naming conventions
- Add component documentation
- Test performance impact

### Testing

- Write unit tests for new features
- Ensure existing tests pass
- Test across different browsers
- Check mobile responsiveness
- Test dark mode
- Verify animations
- Check accessibility

### Performance

- Optimize images
- Use lazy loading
- Minimize bundle size
- Test load times
- Monitor renders
- Check animations
- Verify PWA

### Security

- Validate inputs
- Sanitize data
- Handle errors
- Follow security best practices
- Implement rate limiting
- Test edge cases
- Check dependencies

## Documentation

- Update relevant docs
- Add inline comments
- Document types
- Explain complex logic
- Update changelogs
- Add usage examples
- Include screenshots

## Questions?

Feel free to:
- Open an issue
- Start a discussion
- Contact me directly
- Check existing docs

Thank you for contributing! 
