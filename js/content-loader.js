/*==================== PORTFOLIO ITEMS ====================*/
const portfolioItems = [
    {
        id: 1,
        category: 'web',
        image: 'assets/images/portfolio/portfolio-1.png',
        title: 'Web Design Project',
        description: 'Modern web design with responsive layout',
        link: '#'
    },
    {
        id: 2,
        category: 'web',
        image: 'assets/images/portfolio/portfolio-2.png',
        title: 'E-commerce Website',
        description: 'Online store with shopping cart functionality',
        link: '#'
    },
    {
        id: 3,
        category: 'web',
        image: 'assets/images/portfolio/portfolio-3.png',
        title: 'Portfolio Website',
        description: 'Personal portfolio showcase',
        link: '#'
    },
    {
        id: 4,
        category: 'video',
        image: 'assets/images/portfolio/portfolio-4.png',
        title: 'Video Editing Project',
        description: 'Professional video editing and post-production',
        link: '#'
    },
    {
        id: 5,
        category: 'video',
        image: 'assets/images/portfolio/portfolio-5.png',
        title: 'Motion Graphics',
        description: 'Animated graphics and visual effects',
        link: '#'
    },
    {
        id: 6,
        category: 'autocad',
        image: 'assets/images/portfolio/portfolio-6.png',
        title: 'AutoCAD Design',
        description: 'Technical drawing and 3D modeling',
        link: '#'
    },
    {
        id: 7,
        category: 'autocad',
        image: 'assets/images/portfolio/portfolio-7.png',
        title: 'Architectural Design',
        description: 'Building plans and layouts',
        link: '#'
    },
    {
        id: 8,
        category: 'web',
        image: 'assets/images/portfolio/portfolio-8.png',
        title: 'Web Application',
        description: 'Interactive web application development',
        link: '#'
    },
    {
        id: 9,
        category: 'web',
        image: 'assets/images/portfolio/portfolio-9.png',
        title: 'Landing Page',
        description: 'Conversion-focused landing page design',
        link: '#'
    }
];

/*==================== CERTIFICATES ====================*/
const certificates = [
    {
        id: 1,
        image: 'assets/images/certificates/Apprenticeship Certificate.png',
        title: 'Apprenticeship Certificate',
        description: 'Professional apprenticeship program certification'
    },
    {
        id: 2,
        image: 'assets/images/certificates/Best in Setting a Freelancing Brand.png',
        title: 'Best in Freelancing Brand',
        description: 'Award for excellence in personal branding'
    },
    {
        id: 3,
        image: 'assets/images/certificates/Best in Website Management.png',
        title: 'Best in Website Management',
        description: 'Recognition for outstanding website management skills'
    },
    {
        id: 4,
        image: 'assets/images/certificates/Content Marketing Strategy in social media.png',
        title: 'Content Marketing Strategy',
        description: 'Advanced certification in social media content marketing'
    },
    {
        id: 5,
        image: 'assets/images/certificates/Getting Hired with these amazon virtual assistant task.png',
        title: 'Amazon Virtual Assistant',
        description: 'Specialized certification in Amazon VA tasks'
    },
    {
        id: 6,
        image: 'assets/images/certificates/Gold Certificate Masterclass virtual assistant.png',
        title: 'VA Masterclass Gold Certificate',
        description: 'Advanced certification in virtual assistance'
    }
];

/*==================== PROJECTS ====================*/
const projects = [
    {
        id: 1,
        category: 'web',
        image: 'assets/images/portfolio/portfolio-1.png',
        title: 'E-commerce Platform',
        description: 'Full-featured online store with payment integration',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        link: '#'
    },
    {
        id: 2,
        category: 'video',
        image: 'assets/images/portfolio/portfolio-4.png',
        title: 'Corporate Video Production',
        description: 'Professional company profile video with motion graphics',
        technologies: ['Adobe Premiere', 'After Effects'],
        link: '#'
    },
    {
        id: 3,
        category: 'autocad',
        image: 'assets/images/portfolio/portfolio-6.png',
        title: 'Architectural Design Project',
        description: 'Residential building design with detailed floor plans',
        technologies: ['AutoCAD', 'SketchUp'],
        link: '#'
    }
];

/*==================== LOAD CONTENT ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Load Portfolio Items
    const portfolioContainer = document.querySelector('.portfolio__container');
    if (portfolioContainer) {
        portfolioItems.forEach(item => {
            const portfolioHTML = `
                <div class="portfolio__item filter-${item.category}" data-aos="fade-up">
                    <div class="portfolio__item-wrapper">
                        <img src="${item.image}" alt="${item.title}" class="portfolio__img">
                        <div class="portfolio__item-details">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <a href="${item.link}" class="button button--flex button--small">
                                View Details
                                <i class="fas fa-arrow-right button__icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            portfolioContainer.innerHTML += portfolioHTML;
        });

        // Initialize Isotope after all images are loaded
        window.addEventListener('load', () => {
            const iso = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio__item',
                layoutMode: 'fitRows'
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

    // Load Certificates
    const certificatesWrapper = document.querySelector('.certificates__container .swiper-wrapper');
    if (certificatesWrapper) {
        certificates.forEach(cert => {
            const certificateHTML = `
                <div class="swiper-slide">
                    <div class="certificate__item" data-aos="fade-up">
                        <img src="${cert.image}" alt="${cert.title}" class="certificate__img">
                        <div class="certificate__details">
                            <h3>${cert.title}</h3>
                            <p>${cert.description}</p>
                        </div>
                    </div>
                </div>
            `;
            certificatesWrapper.innerHTML += certificateHTML;
        });

        // Initialize Swiper
        new Swiper('.certificates__container', {
            effect: 'cards',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
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

    // Load Projects
    const projectsContainer = document.querySelector('.projects__container');
    if (projectsContainer) {
        projects.forEach(project => {
            const projectHTML = `
                <div class="project__item" data-aos="fade-up">
                    <div class="project__item-wrapper">
                        <img src="${project.image}" alt="${project.title}" class="project__img">
                        <div class="project__item-details">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project__technologies">
                                ${project.technologies.map(tech => `<span class="project__tech">${tech}</span>`).join('')}
                            </div>
                            <a href="${project.link}" class="button button--flex button--small">
                                View Project
                                <i class="fas fa-arrow-right button__icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.innerHTML += projectHTML;
        });
    }
});
