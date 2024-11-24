export const theme = {
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#2ecc71', // Main primary color
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    accent: {
      purple: '#8b5cf6',
      blue: '#3b82f6',
      pink: '#ec4899',
      orange: '#f97316',
      yellow: '#eab308'
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: {
      light: '#ffffff',
      dark: '#111827'
    },
    text: {
      light: {
        primary: '#1f2937',
        secondary: '#4b5563',
        muted: '#9ca3af'
      },
      dark: {
        primary: '#f9fafb',
        secondary: '#e5e7eb',
        muted: '#9ca3af'
      }
    }
  },
  typography: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
      display: ['Clash Display', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    }
  },
  effects: {
    glassmorphism: {
      light: 'backdrop-filter: blur(16px) saturate(180%); background-color: rgba(255, 255, 255, 0.75);',
      dark: 'backdrop-filter: blur(16px) saturate(180%); background-color: rgba(17, 24, 39, 0.75);'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
      secondary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      accent: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      dark: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      glow: '0 0 15px rgba(46, 204, 113, 0.5)'
    }
  },
  animations: {
    transition: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      slideUp: {
        from: { transform: 'translateY(20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 }
      },
      scaleIn: {
        from: { transform: 'scale(0.95)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 }
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' }
      }
    }
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
