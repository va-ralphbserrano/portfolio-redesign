interface ScriptLoaderOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Loads a script dynamically with performance optimizations
 * @param src Script source URL
 * @param options Loading options
 */
export const loadScript = (src: string, options: ScriptLoaderOptions = {}): void => {
  const existingScript = document.getElementById(options.id || src) as HTMLScriptElement;

  if (existingScript) {
    if (options.onLoad) {
      if (existingScript.hasAttribute('data-loaded')) {
        options.onLoad();
      } else {
        existingScript.addEventListener('load', options.onLoad);
      }
    }
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.id = options.id || src;

  // Performance optimizations
  if (options.async) script.async = true;
  if (options.defer) script.defer = true;
  script.setAttribute('fetchpriority', options.async ? 'low' : 'high');
  script.setAttribute('loading', options.async ? 'lazy' : 'eager');

  // Add resource hints
  const preconnectLink = document.createElement('link');
  preconnectLink.rel = 'preconnect';
  preconnectLink.href = new URL(src).origin;
  document.head.appendChild(preconnectLink);

  script.addEventListener('load', () => {
    script.setAttribute('data-loaded', 'true');
    if (options.onLoad) options.onLoad();
    preconnectLink.remove(); // Clean up preconnect after load
  });

  script.addEventListener('error', (error) => {
    if (options.onError) options.onError(error as unknown as Error);
    preconnectLink.remove(); // Clean up preconnect on error
  });

  document.body.appendChild(script);
};

/**
 * Preloads a script for future use with priority hints
 * @param src Script source URL
 * @param priority Loading priority
 */
export const preloadScript = (src: string, priority: 'high' | 'low' = 'low'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = src;
  link.setAttribute('fetchpriority', priority);
  document.head.appendChild(link);
};

/**
 * Loads multiple scripts in sequence with intelligent scheduling
 * @param scripts Array of script URLs and their options
 */
export const loadScriptsSequentially = async (
  scripts: Array<{ src: string; options?: ScriptLoaderOptions }>
): Promise<void> => {
  const loadWithTimeout = (script: { src: string; options?: ScriptLoaderOptions }): Promise<void> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Script load timeout: ${script.src}`));
      }, 10000); // 10s timeout

      loadScript(script.src, {
        ...script.options,
        onLoad: () => {
          clearTimeout(timeout);
          resolve();
          if (script.options?.onLoad) script.options.onLoad();
        },
        onError: (error) => {
          clearTimeout(timeout);
          reject(error);
          if (script.options?.onError) script.options.onError(error);
        }
      });
    });
  };

  // Use requestIdleCallback for non-critical scripts
  const loadInIdleTime = (script: { src: string; options?: ScriptLoaderOptions }): Promise<void> => {
    return new Promise((resolve) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          loadWithTimeout(script).then(resolve).catch(resolve);
        });
      } else {
        setTimeout(() => {
          loadWithTimeout(script).then(resolve).catch(resolve);
        }, 1);
      }
    });
  };

  for (const script of scripts) {
    if (script.options?.async) {
      // Load async scripts in idle time
      loadInIdleTime(script).catch(console.error);
    } else {
      // Load sync scripts immediately
      try {
        await loadWithTimeout(script);
      } catch (error) {
        console.error('Error loading script:', error);
      }
    }
  }
};
