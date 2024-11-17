# Ralph Bernard Serrano Portfolio

A modern, type-safe portfolio website built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Stack**: Built with React 18, TypeScript, and Vite
- **Type Safety**: Comprehensive type checking and validation
- **Performance**: Optimized for speed and user experience
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG 2.1 compliant with full keyboard navigation
- **Dark Mode**: Automatic and manual theme switching
- **Animations**: Smooth transitions and micro-interactions
- **Contact Form**: Secure form handling with rate limiting
- **SEO Ready**: Meta tags and structured data
- **PWA Support**: Works offline and can be installed

## 🛠 Tech Stack

- **Framework**: React 18.2.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Effects**: Three.js
- **Forms**: EmailJS
- **Testing**: Vitest & Testing Library
- **Linting**: ESLint & Prettier
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/va-ralphbserrano/portfolio-redesign.git
cd portfolio-redesign
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Start development server:
```bash
npm run dev
```

## 🏗 Project Structure

```
portfolio-redesign/
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # System design
│   ├── DEVELOPMENT.md      # Development guide
│   └── API.md             # API documentation
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── sections/     # Page sections
│   ├── data/             # Static data
│   ├── hooks/            # Custom hooks
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── test/                  # Test files
└── vite.config.ts         # Vite configuration
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 📝 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run typecheck`: Run TypeScript checks
- `npm run format`: Format code with Prettier
- `npm test`: Run tests
- `npm run test:coverage`: Run tests with coverage

## 🔒 Security

- Rate limiting for form submissions
- Input validation and sanitization
- Error handling and logging
- Type safety throughout
- Secure data handling

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [API Documentation](./docs/API.md)
- [Security Policy](./SECURITY.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Enhancement Plans](./ENHANCEMENTS.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Contact

- **Email**: ralph.b.serrano@gmail.com
- **GitHub**: [@va-ralphbserrano](https://github.com/va-ralphbserrano)
- **LinkedIn**: [Ralph Bernard Serrano](https://www.linkedin.com/in/ralphbserrano/)
- **Portfolio**: [ralphbserrano.dev](https://ralphbserrano.dev)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)
- [EmailJS](https://www.emailjs.com/)
