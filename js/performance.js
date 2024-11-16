/*==================== PERFORMANCE OPTIMIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Resource Hints
    const addResourceHint = (type, url) => {
        const link = document.createElement('link');
        link.rel = type;
        link.href = url;
        document.head.appendChild(link);
    };

    // Preconnect to external domains
    ['https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com'].forEach(domain => {
        addResourceHint('preconnect', domain);
    });

    // Defer non-critical CSS
    const loadDeferredStyles = () => {
        document.querySelectorAll('link[data-defer]').forEach(link => {
            link.rel = 'stylesheet';
            link.removeAttribute('data-defer');
        });
    };

    // Load deferred styles after page load
    if (window.requestIdleCallback) {
        requestIdleCallback(loadDeferredStyles);
    } else {
        setTimeout(loadDeferredStyles, 2000);
    }

    // Script Loading Optimization
    const loadScript = (src, async = true, defer = true) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            script.defer = defer;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    // Load non-critical scripts
    const loadNonCriticalScripts = () => {
        const scripts = [
            'js/animations.js',
            'js/typing.js',
            'js/theme.js'
        ];

        scripts.forEach(src => {
            loadScript(src).catch(console.error);
        });
    };

    // Event Delegation
    document.addEventListener('click', (e) => {
        // Handle all click events through delegation
        if (e.target.matches('.portfolio__item')) {
            // Portfolio item click handling
        } else if (e.target.matches('.nav__link')) {
            // Navigation link click handling
        }
    });

    // Debounce function for performance
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle function for performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Optimize scroll events
    const optimizedScroll = throttle(() => {
        // Handle scroll events
        const scrollPosition = window.scrollY;
        document.documentElement.style.setProperty('--scroll-y', `${scrollPosition}px`);
    }, 100);

    window.addEventListener('scroll', optimizedScroll);

    // Optimize resize events
    const optimizedResize = debounce(() => {
        // Handle resize events
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }, 250);

    window.addEventListener('resize', optimizedResize);

    // Cache DOM elements
    const cache = new Map();
    const getElement = (selector) => {
        if (!cache.has(selector)) {
            cache.set(selector, document.querySelector(selector));
        }
        return cache.get(selector);
    };

    // Request Animation Frame for smooth animations
    const animate = (element, properties, duration) => {
        const start = performance.now();
        const initialValues = {};
        
        // Get initial values
        for (let prop in properties) {
            initialValues[prop] = parseFloat(getComputedStyle(element)[prop]);
        }

        const tick = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Update properties
            for (let prop in properties) {
                const initial = initialValues[prop];
                const target = properties[prop];
                const current = initial + (target - initial) * progress;
                element.style[prop] = `${current}px`;
            }

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    // Initialize performance monitoring
    if ('performance' in window && 'mark' in window.performance) {
        performance.mark('app-ready');
        
        // Measure time to interactive
        Promise.all([
            document.readyState === 'complete' ? Promise.resolve() : 
                new Promise(resolve => window.addEventListener('load', resolve))
        ]).then(() => {
            performance.mark('tti');
            performance.measure('time-to-interactive', 'app-ready', 'tti');
        });
    }
});
