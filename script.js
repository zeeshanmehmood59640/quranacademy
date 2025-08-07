// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic validation
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree (you'll need to replace with your actual form endpoint)
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage();
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            showErrorMessage('Please check your form data and try again.');
                        } else {
                            showErrorMessage('Oops! There was a problem submitting your form');
                        }
                    })
                }
            })
            .catch(error => {
                showErrorMessage('Network error. Please try again later.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    // Required fields validation
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.father_name || formData.father_name.trim() === '') {
        errors.push('Father\'s name is required');
    }
    
    if (!formData.gender || formData.gender === '') {
        errors.push('Please select gender');
    }
    
    if (!formData.age || formData.age === '') {
        errors.push('Age is required');
    }
    
    if (!formData.contact || formData.contact.trim() === '') {
        errors.push('Contact number is required');
    }
    
    if (!formData.address || formData.address.trim() === '') {
        errors.push('Address is required');
    }
    
    // Email is optional, but if provided, validate format
    if (formData.email && formData.email.trim() !== '' && !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.course || formData.course === '') {
        errors.push('Please select a course');
    }
    
    if (!formData.background || formData.background === '') {
        errors.push('Please select student background');
    }
    
    if (!formData.weekly_days || formData.weekly_days === '') {
        errors.push('Please select preferred weekly class days');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage() {
    const message = `
        <div class="form-success">
            <strong>Thank you!</strong> Your message has been sent successfully. 
            We'll get back to you within 24 hours insha'Allah.
        </div>
    `;
    showFormMessage(message);
}

// Show error message
function showErrorMessage(errorText) {
    const message = `
        <div class="form-error">
            <strong>Error:</strong> ${errorText}
        </div>
    `;
    showFormMessage(message);
}

// Display form message
function showFormMessage(messageHTML) {
    const contactForm = document.getElementById('contactForm');
    const existingMessage = contactForm.querySelector('.form-success, .form-error');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    contactForm.insertAdjacentHTML('afterbegin', messageHTML);
    
    // Scroll to message
    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        const message = contactForm.querySelector('.form-success, .form-error');
        if (message) {
            message.remove();
        }
    }, 5000);
}

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = [
        '.service-card',
        '.testimonial-card',
        '.stat',
        '.about-text',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
});

// Typing Animation for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// WhatsApp Contact Button
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp floating button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/15551234567'; // Replace with your WhatsApp number
    whatsappBtn.target = '_blank';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
    
    // Add styles
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #25d366;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 60px;
        font-size: 25px;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        text-decoration: none;
    `;
    
    document.body.appendChild(whatsappBtn);
    
    // Hover effect
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(37, 211, 102, 0.6)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
    });
});

// Loading Screen (Optional)
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen if it exists
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 1000);
    }
});

// Form Auto-save (Local Storage)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        const formFields = form.querySelectorAll('input, select, textarea');
        
        // Load saved data
        formFields.forEach(field => {
            const savedValue = localStorage.getItem(`form_${field.name}`);
            if (savedValue && field.type !== 'submit') {
                field.value = savedValue;
            }
        });
        
        // Save data on input
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.type !== 'submit') {
                    localStorage.setItem(`form_${this.name}`, this.value);
                }
            });
        });
        
        // Clear saved data on successful submit
        form.addEventListener('submit', function() {
            formFields.forEach(field => {
                localStorage.removeItem(`form_${field.name}`);
            });
        });
    }
});

// Print Functionality
function printPage() {
    window.print();
}

// Share Functionality
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'Learn Quran Online - Expert Quran Teacher',
            text: 'Join thousands of students learning Quranic recitation, memorization, and understanding with our certified teacher.',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Website URL copied to clipboard!');
        });
    }
}

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
