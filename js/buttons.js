/*==================== BUTTON HANDLERS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Download CV Button
    const cvButton = document.querySelector('a[download]');
    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace 'assets/cv/RalphBernardSerrano-CV.pdf' with your actual CV file path
            window.location.href = 'assets/cv/RalphBernardSerrano-CV.pdf';
        });
    }

    // Service Modal Buttons
    const serviceButtons = document.querySelectorAll('.services__button');
    const modalCloses = document.querySelectorAll('.services__modal-close');
    const modals = document.querySelectorAll('.services__modal');

    serviceButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modals[index].classList.add('active-modal');
        });
    });

    modalCloses.forEach((close) => {
        close.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('active-modal');
            });
        });
    });

    // Close modals when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active-modal');
            }
        });
    });

    // Portfolio Filter Buttons
    const filterButtons = document.querySelectorAll('#portfolio-filters li');
    const portfolioItems = document.querySelectorAll('.portfolio__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            // Add active class to clicked button
            button.classList.add('filter-active');

            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(`filter-${filterValue}`)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Buttons
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Disable button during form submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Get form data
            const formData = new FormData(contactForm);
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            }, 2000);
        });
    }

    // Social Media Buttons
    const socialButtons = document.querySelectorAll('.footer__social-link');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Scroll to Top Button
    const scrollButton = document.getElementById('scroll-up');
    if (scrollButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 560) {
                scrollButton.classList.add('show-scroll');
            } else {
                scrollButton.classList.remove('show-scroll');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme Toggle Button
    const themeButton = document.getElementById('theme-button');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeButton.classList.toggle('fa-sun');
            themeButton.classList.toggle('fa-moon');
            
            // Save theme preference
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('selected-theme', theme);
        });
    }

    // Navigation Toggle Button
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Show notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
