// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize home page components
    initBannerSlider();
    initCategoryCards();
    initOfferCards();
    initFeatureAnimations();
    
    // Initialize product information
    initProductInfo();
    
    // Initialize product interactions
    initProductInteractions();
    
    // Initialize reviews section
    initReviews();
    
    // Initialize cost calculator form
    initCostCalculator();
});

// Banner slider functionality
function initBannerSlider() {
    const slider = document.querySelector('.banner-slider');
    const slides = document.querySelectorAll('.banner-slide');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // If we had multiple slides, we would implement slider logic here
    // For now, we just ensure the first slide is active
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Add animation to banner content
    const bannerContent = document.querySelector('.banner-content');
    if (bannerContent) {
        setTimeout(() => {
            bannerContent.style.opacity = '1';
            bannerContent.style.transform = 'translateY(0)';
        }, 300);
        
        // Initial state for animation
        bannerContent.style.cssText += `
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        `;
    }
}

// Category cards interactions
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach((card, index) => {
        // Stagger animation
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        // Track button clicks
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const categoryName = card.querySelector('h3')?.textContent || 'Неизвестная категория';
                
                // Log category interaction
                console.log('Клик по категории:', categoryName);
                
                // Show notification
                if (window.RozetkaGlobal) {
                    window.RozetkaGlobal.showNotification(
                        `Категория "${categoryName}" временно недоступна`,
                        'info'
                    );
                    
                    window.RozetkaGlobal.trackDisabledAction('category_click', {
                        category: categoryName,
                        timestamp: new Date().toISOString()
                    });
                }
            });
        }
    });
}

// Offer cards functionality
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach((card, index) => {
        // Stagger animation
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 150);
        
        // Add interactive effects for product info
        const detailsBtn = card.querySelector('.btn-primary');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productName = card.querySelector('h3')?.textContent || 'Товар';
                
                // Show product details notification
                if (window.RozetkaGlobal) {
                    window.RozetkaGlobal.showNotification(
                        `Подробная информация о "${productName}" скоро будет доступна`,
                        'info'
                    );
                    
                    window.RozetkaGlobal.trackDisabledAction('product_details', {
                        product: productName,
                        timestamp: new Date().toISOString()
                    });
                }
            });
        }
        
        // Add bookmark functionality (simulated)
        addBookmarkButton(card);
    });
}

// Feature animations
function initFeatureAnimations() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    featureItems.forEach((item, index) => {
        // Set initial state
        item.style.cssText += `
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        `;
        
        observer.observe(item);
    });
}

// Product information system
let bookmarkedItems = [];

function initProductInfo() {
    console.log('Product information system initialized');
}

// Bookmark functionality
function addBookmarkButton(card) {
    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.className = 'bookmark-btn';
    bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
    bookmarkBtn.setAttribute('aria-label', 'Добавить в закладки');
    bookmarkBtn.setAttribute('data-disabled', 'true');
    
    // Style the button
    bookmarkBtn.style.cssText = `
        position: absolute;
        top: 15px;
        left: 15px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-size: 16px;
        color: #666;
    `;
    
    // Add hover effects
    bookmarkBtn.addEventListener('mouseenter', function() {
        this.style.background = 'white';
        this.style.color = 'var(--primary-color)';
        this.style.transform = 'scale(1.1)';
    });
    
    bookmarkBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.9)';
        this.style.color = '#666';
        this.style.transform = 'scale(1)';
    });
    
    // Add click handler
    bookmarkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = card.querySelector('h3')?.textContent || 'Товар';
        
        if (window.RozetkaGlobal) {
            window.RozetkaGlobal.showNotification(
                'Закладки временно недоступны',
                'info'
            );
            
            window.RozetkaGlobal.trackDisabledAction('bookmark_click', {
                product: productName,
                timestamp: new Date().toISOString()
            });
        }
    });
    
    card.style.position = 'relative';
    card.appendChild(bookmarkBtn);
}

// Product interactions
function initProductInteractions() {
    // Add quick view functionality
    const productImages = document.querySelectorAll('.offer-card img, .category-card img');
    
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const productName = this.closest('.offer-card, .category-card')?.querySelector('h3')?.textContent || 'Товар';
            
            if (window.RozetkaGlobal) {
                window.RozetkaGlobal.showNotification(
                    `Подробная информация о "${productName}" скоро будет доступна`,
                    'info'
                );
                
                window.RozetkaGlobal.trackDisabledAction('product_info_view', {
                    product: productName,
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        // Add cursor pointer
        img.style.cursor = 'pointer';
    });
    
    // Price comparison tooltip
    const prices = document.querySelectorAll('.price');
    prices.forEach(priceElement => {
        const oldPrice = priceElement.querySelector('.price-old');
        const currentPrice = priceElement.querySelector('.price-current');
        
        if (oldPrice && currentPrice) {
            const oldPriceValue = parseFloat(oldPrice.textContent.replace(/[^\d]/g, ''));
            const currentPriceValue = parseFloat(currentPrice.textContent.replace(/[^\d]/g, ''));
            
            if (oldPriceValue && currentPriceValue) {
                const discount = Math.round(((oldPriceValue - currentPriceValue) / oldPriceValue) * 100);
                const savings = oldPriceValue - currentPriceValue;
                
                const tooltip = document.createElement('div');
                tooltip.className = 'price-tooltip';
                tooltip.innerHTML = `Экономия: ${savings} BYN (${discount}%)`;
                tooltip.style.cssText = `
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--gray-800);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 10;
                `;
                
                priceElement.style.position = 'relative';
                priceElement.appendChild(tooltip);
                
                priceElement.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                });
                
                priceElement.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                });
            }
        }
    });
}

// Add bookmark animation styles
const bookmarkAnimationStyles = `
    .bookmark-update {
        animation: bookmarkBounce 0.3s ease-out;
    }
    
    @keyframes bookmarkBounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;

// Inject bookmark animation styles
const bookmarkStyleSheet = document.createElement('style');
bookmarkStyleSheet.textContent = bookmarkAnimationStyles;
document.head.appendChild(bookmarkStyleSheet);

// Reviews pagination functionality
function showReviewsPage(pageNumber) {
    // Remove active class from all pagination buttons
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    document.querySelectorAll('.pagination-btn').forEach((btn, index) => {
        if (index + 1 === pageNumber) {
            btn.classList.add('active');
        }
    });
    
    // Hide all review cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // Show reviews for the selected page (2 reviews per page)
    const reviewsPerPage = 2;
    const startIndex = (pageNumber - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    
    // Animate in the selected reviews
    for (let i = startIndex; i < endIndex && i < reviewCards.length; i++) {
        const card = reviewCards[i];
        card.style.display = 'block';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, (i - startIndex) * 150);
    }
}

// Initialize reviews functionality
function initReviews() {
    // Show first page by default
    showReviewsPage(1);
    
    // Initialize review cards with animation properties
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll animation for reviews section
    const reviewsSection = document.querySelector('.reviews');
    if (reviewsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateReviewsStats();
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(reviewsSection);
    }
}

// Animate reviews statistics
function animateReviewsStats() {
    const statNumbers = document.querySelectorAll('.reviews-stats .stat-number');
    
    statNumbers.forEach(statNumber => {
        const finalValue = statNumber.textContent;
        
        // Extract numeric value for animation
        if (finalValue === '4.8') {
            animateNumber(statNumber, 0, 4.8, 1000, (val) => val.toFixed(1));
        } else if (finalValue === '2,847') {
            animateNumber(statNumber, 0, 2847, 1500, (val) => val.toLocaleString());
        } else if (finalValue === '98%') {
            animateNumber(statNumber, 0, 98, 1200, (val) => val + '%');
        }
    });
}

// Number animation helper
function animateNumber(element, start, end, duration, formatter) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (end - start) * easeOut;
        
        element.textContent = formatter(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Make showReviewsPage globally available
window.showReviewsPage = showReviewsPage;

// Cost Calculator Form
function initCostCalculator() {
    const form = document.getElementById('costCalculatorForm');
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const submitBtn = form?.querySelector('.submit-btn');
    
    if (!form) return;
    
    // Phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format Belarus phone number
            if (value.startsWith('375')) {
                if (value.length <= 3) {
                    value = '+375';
                } else if (value.length <= 5) {
                    value = `+375 (${value.slice(3)})`;
                } else if (value.length <= 8) {
                    value = `+375 (${value.slice(3, 5)}) ${value.slice(5)}`;
                } else {
                    value = `+375 (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8, 10)}-${value.slice(10, 12)}`;
                }
            } else if (value.length > 0) {
                if (value.length <= 2) {
                    value = `+375 (${value})`;
                } else if (value.length <= 5) {
                    value = `+375 (${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `+375 (${value.slice(0, 2)}) ${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7, 9)}`;
                }
            }
            
            e.target.value = value;
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            // Allow backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].includes(e.keyCode) ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey) ||
                (e.keyCode === 67 && e.ctrlKey) ||
                (e.keyCode === 86 && e.ctrlKey) ||
                (e.keyCode === 88 && e.ctrlKey) ||
                // Allow home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
    
    // Form submission handling
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            timestamp: new Date().toISOString(),
            source: 'cost_calculator'
        };
        
        // Validate form
        if (!formData.name) {
            showFormError(nameInput, 'Пожалуйста, введите ваше имя');
            return;
        }
        
        if (!formData.phone || formData.phone.length < 10) {
            showFormError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
            return;
        }
        
        // Clear any existing errors
        clearFormErrors();
        
        // Show loading state
        setSubmitButtonLoading(true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Track successful submission
            if (window.RozetkaGlobal) {
                window.RozetkaGlobal.trackDisabledAction('cost_calculator_submit', formData);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            if (window.RozetkaGlobal) {
                window.RozetkaGlobal.showNotification(
                    'Произошла ошибка при отправке формы. Попробуйте позже.',
                    'error'
                );
            }
        } finally {
            setSubmitButtonLoading(false);
        }
    });
    
    // Input focus animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Form helper functions
function showFormError(input, message) {
    clearFormErrors();
    
    input.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    input.parentElement.appendChild(errorElement);
    
    // Focus the input
    input.focus();
}

function clearFormErrors() {
    const form = document.getElementById('costCalculatorForm');
    if (!form) return;
    
    // Remove error classes
    form.querySelectorAll('.form-input.error').forEach(input => {
        input.classList.remove('error');
    });
    
    // Remove error messages
    form.querySelectorAll('.form-error').forEach(error => {
        error.remove();
    });
}

function setSubmitButtonLoading(loading) {
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    const buttonText = submitBtn.querySelector('span');
    const buttonIcon = submitBtn.querySelector('i');
    
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        if (buttonText) buttonText.textContent = 'Отправляем...';
        if (buttonIcon) {
            buttonIcon.className = 'fas fa-spinner fa-spin';
        }
    } else {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        if (buttonText) buttonText.textContent = 'Отправить';
        if (buttonIcon) {
            buttonIcon.className = 'fas fa-paper-plane';
        }
    }
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.calculator-form-container');
    if (!formContainer) return;
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Спасибо за заявку!</h3>
        <p>Мы свяжемся с вами в течение 15 минут для уточнения деталей и расчета стоимости ремонта.</p>
        <button class="btn btn-outline" onclick="hideSuccessMessage()">
            Отправить еще одну заявку
        </button>
    `;
    
    // Hide form, show success message
    const form = document.getElementById('costCalculatorForm');
    const formHeader = document.querySelector('.form-header');
    const formBenefits = document.querySelector('.form-benefits');
    
    if (form) form.style.display = 'none';
    if (formHeader) formHeader.style.display = 'none';
    if (formBenefits) formBenefits.style.display = 'none';
    
    formContainer.appendChild(successDiv);
    
    // Add success styles to CSS if not present
    if (!document.querySelector('#success-message-styles')) {
        const styles = document.createElement('style');
        styles.id = 'success-message-styles';
        styles.textContent = `
            .success-message {
                text-align: center;
                padding: var(--spacing-8) 0;
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto var(--spacing-4);
                font-size: 2rem;
                color: white;
                animation: successBounce 0.6s ease-out;
            }
            
            @keyframes successBounce {
                0% { transform: scale(0); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .success-message h3 {
                color: var(--primary-color);
                font-size: var(--font-size-2xl);
                margin-bottom: var(--spacing-3);
            }
            
            .success-message p {
                color: var(--gray-600);
                margin-bottom: var(--spacing-6);
                line-height: 1.6;
            }
            
            .form-error {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            }
            
            .form-input.error {
                border-color: #ef4444 !important;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Auto-hide after 10 seconds
    setTimeout(hideSuccessMessage, 10000);
}

function hideSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    const form = document.getElementById('costCalculatorForm');
    const formHeader = document.querySelector('.form-header');
    const formBenefits = document.querySelector('.form-benefits');
    
    if (successMessage) successMessage.remove();
    if (form) form.style.display = 'block';
    if (formHeader) formHeader.style.display = 'block';
    if (formBenefits) formBenefits.style.display = 'flex';
}

// Simulate form submission (replace with actual API)
async function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', formData);
            resolve({ success: true, message: 'Заявка успешно отправлена' });
        }, 2000);
    });
}

// Make functions globally available
window.hideSuccessMessage = hideSuccessMessage;

// Export for other scripts
window.RozetkaHome = {
    getBookmarkedItems: () => bookmarkedItems,
    clearBookmarks: () => {
        bookmarkedItems = [];
    },
    initReviews: initReviews,
    initCostCalculator: initCostCalculator
};
