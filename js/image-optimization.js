/*==================== IMAGE OPTIMIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading with Intersection Observer
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const loadImage = (image) => {
        const src = image.dataset.src;
        if (!src) return;

        // Create a new image to preload
        const img = new Image();
        img.onload = () => {
            if (image.tagName === 'IMG') {
                image.src = src;
            } else {
                image.style.backgroundImage = `url('${src}')`;
            }
            image.classList.add('loaded');
            image.removeAttribute('data-src');
        };
        img.src = src;
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    // Create observer
    const imageObserver = new IntersectionObserver(handleIntersection, imageOptions);

    // Observe all lazy images
    lazyImages.forEach(img => imageObserver.observe(img));

    // Fallback for browsers that don't support Intersection Observer
    if (!('IntersectionObserver' in window)) {
        lazyImages.forEach(img => loadImage(img));
    }

    // Generate responsive srcset for images
    const generateSrcset = (imagePath) => {
        const sizes = [320, 480, 768, 1024, 1366];
        return sizes.map(size => {
            const path = imagePath.replace(/\.(jpg|png)$/, `-${size}w.$1`);
            return `${path} ${size}w`;
        }).join(', ');
    };

    // Add srcset to portfolio and project images
    document.querySelectorAll('.portfolio__img, .project__img').forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            img.setAttribute('srcset', generateSrcset(src));
            img.setAttribute('sizes', '(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 768px) 728px, (max-width: 1024px) 984px, 1366px');
        }
    });

    // WebP support detection
    const supportsWebP = () => {
        const elem = document.createElement('canvas');
        if (elem.getContext && elem.getContext('2d')) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    };

    // Add WebP support class to body
    if (supportsWebP()) {
        document.body.classList.add('webp');
    }

    // Image error handling
    const handleImageError = (img) => {
        img.onerror = null;
        img.src = 'assets/images/placeholder.jpg';
        img.classList.add('image-error');
    };

    document.querySelectorAll('img').forEach(img => {
        img.onerror = () => handleImageError(img);
    });
});
