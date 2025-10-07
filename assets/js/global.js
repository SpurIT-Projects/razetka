// Global JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize anchor navigation
    initAnchorNavigation();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize disabled elements tracking
    trackDisabledElements();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize page transitions
    initPageTransitions();
});

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (!scrollButton) return;
    
    // Show/hide scroll button based on scroll position
    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleScrollButton);
    scrollButton.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleScrollButton();
}

// Anchor navigation
function initAnchorNavigation() {
    // Smooth scroll to anchors
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Show notification for non-existing anchors
                showNotification(`Раздел "${targetId}" находится в разработке`, 'info');
            }
        }
    });
}

// Mobile navigation
function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    
    if (!mobileMenuToggle || !mobileNav) return;
    
    // Open mobile menu
    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu on close button click
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu on overlay click
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu on link click
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    });
    
    // Prevent scroll when menu is open
    mobileNav.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}

// Track disabled elements and actions
let disabledElements = [];
let disabledActions = [];

function trackDisabledElements() {
    // Find all disabled elements
    const disabled = document.querySelectorAll('[data-disabled="true"]');
    
    disabled.forEach(element => {
        const elementInfo = {
            tag: element.tagName.toLowerCase(),
            text: element.textContent.trim(),
            href: element.href || null,
            id: element.id || null,
            className: element.className || null,
            type: getElementType(element)
        };
        
        disabledElements.push(elementInfo);
        
        // Add click tracking
        element.addEventListener('click', function(e) {
            e.preventDefault();
            trackDisabledAction('click', {
                element: elementInfo,
                timestamp: new Date().toISOString()
            });
            
            showNotification('Эта функция временно недоступна', 'info');
        });
    });
    
    console.log('Найдено неработающих элементов:', disabledElements.length);
}

function getElementType(element) {
    if (element.tagName === 'A') return 'link';
    if (element.tagName === 'BUTTON') return 'button';
    if (element.type === 'submit') return 'submit-button';
    return 'interactive-element';
}

function trackDisabledAction(action, data) {
    disabledActions.push({
        action: action,
        data: data,
        timestamp: new Date().toISOString()
    });
    
    console.log('Отслежено действие с отключенным элементом:', action, data);
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation for inputs
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name') || field.getAttribute('id') || 'поле';
    let isValid = true;
    let errorMessage = '';
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${fieldName} обязательно для заполнения`;
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Введите корректный email адрес';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            errorMessage = 'Введите корректный номер телефона';
            isValid = false;
        }
    }
    
    // Show or clear error
    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Page transitions and loading
function initPageTransitions() {
    // Add loading state to forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('[type="submit"], button:not([type="button"])');
            if (submitButton) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                
                // Re-enable after 3 seconds (simulated loading)
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });
    
    // Smooth transitions for page elements
    const animatedElements = document.querySelectorAll('.category-card, .feature-item, .offer-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Закрыть">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInFromRight 0.3s ease-out;
    `;
    
    // Set colors based on type
    const colors = {
        info: { bg: '#3b82f6', text: 'white' },
        success: { bg: '#10b981', text: 'white' },
        warning: { bg: '#f59e0b', text: 'white' },
        error: { bg: '#ef4444', text: 'white' }
    };
    
    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.color = color.text;
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for animations
const animationStyles = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .error {
        border-color: #ef4444 !important;
    }
    
    .loading {
        opacity: 0.6;
        pointer-events: none;
        position: relative;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .nav-links.mobile-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        z-index: 100;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export functions for use in other scripts
window.RozetkaGlobal = {
    showNotification,
    trackDisabledAction,
    getDisabledElements: () => disabledElements,
    getDisabledActions: () => disabledActions
};