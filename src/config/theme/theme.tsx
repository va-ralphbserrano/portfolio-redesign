type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  primaryHover: string;
  cardBg: string;
  headingColor: string;
  textColor: string;
  textMuted: string;
}

interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

const createTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: mode === 'light' ? {
    primary: '#16a34a',
    primaryHover: '#15803d',
    cardBg: '#ffffff',
    headingColor: '#111827',
    textColor: '#4b5563',
    textMuted: '#6b7280',
  } : {
    primary: '#22c55e',
    primaryHover: '#16a34a',
    cardBg: '#1f2937',
    headingColor: '#ffffff',
    textColor: '#d1d5db',
    textMuted: '#9ca3af',
  }
});

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

export type { Theme, ThemeMode, ThemeColors };
