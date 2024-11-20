import { useCallback } from 'react';
import { CacheProvider } from '../implementations/CacheProvider';
import { useProvider } from './useProvider';
import { MonitoringService } from '../../services/MonitoringService';

export function useCache(): Record<string, unknown> {
    const [cacheProvider, loading, error] = useProvider(new CacheProvider());

    const set = useCallback(<T>(
        key: string,
        value: T,
        expirationMs?: number
    ): void => {
        if (!cacheProvider) return;
        cacheProvider.set(key, value, expirationMs);
        MonitoringService.getInstance().trackMetric('cache_set', 1, ['cache']);
    }, [cacheProvider]);

    const get = useCallback(<T>(key: string): T | null => {
        if (!cacheProvider) return null;
        const value = cacheProvider.get<T>(key);
        MonitoringService.getInstance().trackMetric('cache_get', 1, ['cache']);
        return value;
    }, [cacheProvider]);

    const remove = useCallback((key: string): void => {
        if (!cacheProvider) return;
        cacheProvider.delete(key);
        MonitoringService.getInstance().trackMetric('cache_delete', 1, ['cache']);
    }, [cacheProvider]);

    const clear = useCallback((): void => {
        if (!cacheProvider) return;
        cacheProvider.clear();
        MonitoringService.getInstance().trackMetric('cache_clear', 1, ['cache']);
    }, [cacheProvider]);

    return {
        set,
        get,
        remove,
        clear,
        loading,
        error,
    };
}
