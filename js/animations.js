/*==================== PRELOADER ====================*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

/*==================== PORTFOLIO ISOTOPE AND FILTER ====================*/
window.addEventListener('load', () => {
    let portfolioContainer = document.querySelector('.portfolio__container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio__item',
            layoutMode: 'fitRows'
        });

        let portfolioFilters = document.querySelectorAll('#portfolio-filters li');

        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                
                portfolioFilters.forEach(el => {
                    el.classList.remove('filter-active');
                });
                filter.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: filter.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', () => {
                    AOS.refresh();
                });
            });
        });
    }
});

/*==================== CERTIFICATES SWIPER ====================*/
let swiper = new Swiper('.certificates__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
});

/*==================== SCROLL ANIMATIONS ====================*/
function reveal() {
    let reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        let windowHeight = window.innerHeight;
        let elementTop = element.getBoundingClientRect().top;
        let elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', reveal);

/*==================== SKILLS ANIMATION ====================*/
function animateSkills() {
    let skills = document.querySelectorAll('.skills__percentage');
    
    skills.forEach(skill => {
        let percentage = skill.getAttribute('data-percentage');
        skill.style.width = percentage + '%';
    });
}

// Trigger skills animation when skills section is in view
let skillsSection = document.querySelector('.skills__content');
if (skillsSection) {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    });
    
    observer.observe(skillsSection);
}

/*==================== SMOOTH SCROLL ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        let target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== PARTICLES BACKGROUND ====================*/
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#2ecc71'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2ecc71',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}
