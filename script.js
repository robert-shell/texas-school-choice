// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.background = 'var(--primary-color)';
    navMenu.style.flexDirection = 'column';
    navMenu.style.padding = '1rem';
    navMenu.style.boxShadow = 'var(--card-shadow)';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.style.display = '';
    }
});

// Modal functionality
const modal = document.getElementById('contact-modal');
const contactForm = document.getElementById('contact-form');

function showContactForm() {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus the first input for accessibility
    const firstInput = modal.querySelector('input[type="text"]');
    if (firstInput) firstInput.focus();
}

function closeContactForm() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeContactForm();
    }
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const formData = new FormData(contactForm);
    console.log('Form submitted with data:', Object.fromEntries(formData));
    
    // Show success message
    const originalContent = contactForm.innerHTML;
    contactForm.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;">✓</div>
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Thank You!</h3>
            <p>We'll send you information about Texas School Choice soon.</p>
        </div>
    `;
    
    // Reset form and close modal after 3 seconds
    setTimeout(() => {
        contactForm.innerHTML = originalContent;
        contactForm.reset();
        closeContactForm();
    }, 3000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        ...document.querySelectorAll('.benefit-card'),
        ...document.querySelectorAll('.option-card'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.step')
    ];
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.animated) {
            entry.target.animated = true;
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text === '$1B') {
                statNumber.textContent = '$';
                animateCounter({ 
                    textContent: '$',
                    set textContent(val) { statNumber.textContent = '$' + val + 'B'; }
                }, 1);
            } else if (text === '72%') {
                animateCounter({ 
                    textContent: '',
                    set textContent(val) { statNumber.textContent = val + '%'; }
                }, 72);
            } else if (text === '100K') {
                animateCounter({ 
                    textContent: '',
                    set textContent(val) { statNumber.textContent = val + 'K'; }
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to benefit cards
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid var(--accent-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = '';
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

navbar.style.transition = 'transform 0.3s ease-in-out';