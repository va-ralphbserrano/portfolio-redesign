import { useEffect, useRef, useState } from 'react';
import { BaseProvider, IProviderState } from '../core/BaseProvider';

export function useProvider<T>(providerName: string): [BaseProvider<T> | null, IProviderState] {
  const providerRef = useRef<BaseProvider<T> | null>(null);
  const [providerState, setProviderState] = useState<IProviderState>({
    isInitialized: false,
    isLoading: false,
    error: null
  });

  useEffect(() => {
    const initializeProvider = async () => {
      if (!providerRef.current) {
        try {
          const { default: Provider } = await import(`../implementations/${providerName}`);
          const provider = new Provider({ name: providerName });
          providerRef.current = provider;
          
          if (provider instanceof BaseProvider) {
            await provider.initialize();
            setProviderState(provider.getState());
          } else {
            throw new Error('Invalid provider instance');
          }
        } catch (error) {
          setProviderState(prev => ({
            ...prev,
            error: error instanceof Error ? error : new Error('Failed to initialize provider')
          }));
        }
      }
    };

    initializeProvider();

    return () => {
      const provider = providerRef.current;
      if (provider && provider instanceof BaseProvider) {
        provider.dispose();
        providerRef.current = null;
      }
    };
  }, [providerName]);

  return [providerRef.current, providerState];
}
