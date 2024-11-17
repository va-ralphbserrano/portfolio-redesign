import { createContext, useContext, useState } from 'react';
import { FormContextType, FormProviderProps, FormState } from './types';

const initialState: FormState = {
  isSubmitting: false,
  isSuccess: false,
  error: null
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const resetForm = () => {
    setFormState(initialState);
  };

  return (
    <FormContext.Provider value={{ formState, setFormState, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export default FormContext;
