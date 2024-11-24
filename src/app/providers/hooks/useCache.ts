import { useEffect, useState } from 'react';
import { useProvider } from './useProvider';
import { CacheProvider } from '../implementations/CacheProvider';
import { IProviderState } from '../core/BaseProvider';

export function useCache<T>(): [CacheProvider<T> | null, IProviderState] {
  const [provider, providerState] = useProvider<T>('CacheProvider');
  const [cacheProvider, setCacheProvider] = useState<CacheProvider<T> | null>(null);

  useEffect(() => {
    if (provider && provider instanceof CacheProvider) {
      setCacheProvider(provider as CacheProvider<T>);
    }
  }, [provider]);

  return [cacheProvider, providerState];
}
