import { ReactNode } from 'react';
import { ThemeProvider } from '../../features/theme/context/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default AppProviders;
