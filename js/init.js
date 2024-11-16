/*==================== INITIALIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 100
    });

    // Initialize Swiper
    if (document.querySelector('.certificates__container')) {
        new Swiper('.certificates__container', {
            effect: 'cards',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    // Initialize Portfolio Filter
    const portfolioContainer = document.querySelector('.portfolio__container');
    if (portfolioContainer) {
        window.addEventListener('load', () => {
            const iso = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio__item',
                layoutMode: 'fitRows',
                transitionDuration: '0.4s'
            });

            // Filter items on button click
            document.querySelector('#portfolio-filters').addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    const filterValue = e.target.getAttribute('data-filter');
                    iso.arrange({ filter: filterValue === '*' ? null : `.filter-${filterValue}` });

                    // Update active filter button
                    document.querySelectorAll('#portfolio-filters li').forEach(btn => {
                        btn.classList.remove('filter-active');
                    });
                    e.target.classList.add('filter-active');
                }
            });
        });
    }

    // Initialize Lazy Loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Remove Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Initialize Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add focused class on input focus
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            // Remove focused class if input is empty
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    });
});
