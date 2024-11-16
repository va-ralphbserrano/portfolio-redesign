/*==================== SCROLL TOP ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const scrollUp = document.getElementById('scroll-up');

    function scrollTop() {
        const scrollY = window.pageYOffset;

        // Show scroll button when page is scrolled down
        if (scrollUp) {
            scrollUp.classList.toggle('show-scroll', scrollY >= 560);
        }
    }

    window.addEventListener('scroll', scrollTop);

    // Scroll to top when button is clicked
    if (scrollUp) {
        scrollUp.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add hover effect
    if (scrollUp) {
        scrollUp.addEventListener('mouseenter', () => {
            scrollUp.style.transform = 'translateY(-5px)';
        });

        scrollUp.addEventListener('mouseleave', () => {
            scrollUp.style.transform = 'translateY(0)';
        });
    }
});
