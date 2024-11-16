/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector('.contact__form');
const submitButton = contactForm.querySelector('button[type="submit"]');
const inputs = contactForm.querySelectorAll('.contact__form-input');

// Form validation
const validateForm = () => {
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            removeError(input);
            if (input.type === 'email') {
                if (!isValidEmail(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email');
                }
            }
        }
    });
    return isValid;
};

// Email validation
const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Show error message
const showError = (input, message) => {
    const formDiv = input.parentElement;
    const errorDiv = formDiv.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!formDiv.querySelector('.error-message')) {
        formDiv.appendChild(errorDiv);
    }
    input.classList.add('error');
};

// Remove error message
const removeError = (input) => {
    const formDiv = input.parentElement;
    const errorDiv = formDiv.querySelector('.error-message');
    if (errorDiv) {
        formDiv.removeChild(errorDiv);
    }
    input.classList.remove('error');
};

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            throw new Error(data.error || 'Something went wrong');
        }
    } catch (error) {
        // Show error message
        showNotification(error.message, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane button__icon"></i>';
    }
});

// Show notification
const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Add floating label effect
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

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
