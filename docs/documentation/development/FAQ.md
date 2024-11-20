# Frequently Asked Questions

## Development

### Build System

#### Q: Why Vite instead of Next.js?
A: Vite was chosen for its superior development experience, faster build times, and better support for our specific needs in terms of Three.js integration and custom bundling requirements.

#### Q: How do I add new dependencies?
A: Use `npm install` for production dependencies and `npm install --save-dev` for development dependencies. Always update the documentation if adding major new features.

### Components

#### Q: How should I structure new components?
A: Follow the atomic design pattern. Place shared components in `common/`, section-specific components in their respective section directories, and maintain proper TypeScript types.

#### Q: How do I handle component styling?
A: Use Tailwind CSS for styling. For complex components, consider creating a dedicated styles file if needed.

### State Management

#### Q: When should I use Context vs local state?
A: Use Context for truly global state (PDF handling, theme). Use local state for component-specific state.

#### Q: How do I handle form state?
A: Use local state for simple forms. For complex forms, consider using libraries like React Hook Form.

### Performance

#### Q: How do I optimize Three.js performance?
A: Follow the guidelines in THREE_JS_SYSTEM.md. Key points: use proper geometry disposal, implement level of detail, and monitor performance metrics.

#### Q: How do I handle large assets?
A: Use lazy loading, proper image optimization, and consider implementing progressive loading for 3D models.

### Testing

#### Q: What should I test?
A: Focus on:
- Component rendering and interactions
- Service functionality
- Critical user paths
- Performance metrics

#### Q: How do I mock services?
A: Use Jest mock functions for services. See examples in the testing documentation.

### Deployment

#### Q: How do I prepare for production?
A: Run the full test suite, check bundle size, verify all assets are optimized, and test in a staging environment first.

#### Q: How do I handle environment variables?
A: Use `.env` files for local development and proper CI/CD secrets for production.

### Troubleshooting

#### Q: Build fails with Three.js errors
A: Ensure proper module imports and check THREE_JS_SYSTEM.md for correct setup.

#### Q: Performance issues in development
A: This is normal for development mode. Check production build for actual performance.

## Contributing

### Q: How do I contribute?
A: Follow the contribution guide in CONTRIBUTION_GUIDE.md. Key points:
1. Create a feature branch
2. Follow coding standards
3. Add tests
4. Update documentation
5. Submit PR

### Q: How do I report bugs?
A: Create an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
