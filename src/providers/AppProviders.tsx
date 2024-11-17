import { ReactNode } from 'react';
import { ThemeProvider, FormProvider, LoadingProvider } from '../context';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <FormProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </FormProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
