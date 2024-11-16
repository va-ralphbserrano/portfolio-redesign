# Contributing to Portfolio Redesign

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/portfolio-redesign.git
```
3. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

## 💻 Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Follow the coding standards:
- Use TypeScript for new components
- Follow the existing file structure
- Use Tailwind CSS for styling
- Add JSDoc comments for functions
- Ensure responsive design

## 🧪 Testing

1. Run tests:
```bash
npm run test
```

2. Ensure your code:
- Has no console errors
- Works in both light and dark modes
- Is responsive on all devices
- Follows accessibility guidelines

## 📝 Pull Request Process

1. Update documentation if needed
2. Add descriptive commit messages
3. Test all changes thoroughly
4. Create a pull request with:
   - Clear description
   - Screenshots if UI changes
   - List of changes made

## 🎨 Style Guide

### Component Structure
```jsx
import React from 'react';
import { motion } from 'framer-motion';

const ComponentName = () => {
  // State and hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  return (
    <motion.div>
      {/* Component JSX */}
    </motion.div>
  );
};

export default ComponentName;
```

### File Structure
```
src/
├── components/
│   ├── common/       # Reusable components
│   ├── layout/       # Layout components
│   └── sections/     # Page sections
├── hooks/            # Custom hooks
├── styles/           # Global styles
└── utils/            # Utility functions
```

## 📦 Dependencies

Before adding new dependencies:
1. Check if functionality exists in current deps
2. Evaluate bundle size impact
3. Check package maintenance status
4. Consider writing custom implementation

## 🐛 Bug Reports

When reporting bugs:
1. Use the issue template
2. Include browser/OS details
3. Provide steps to reproduce
4. Add screenshots if possible

## 💡 Feature Requests

For feature requests:
1. Check existing issues first
2. Use the feature request template
3. Provide clear use cases
4. Include mockups if possible

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
