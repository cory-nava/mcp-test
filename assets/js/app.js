/**
 * City Permitting Portal - JavaScript
 * 
 * This file contains the client-side logic for the permitting application.
 * Created via MCP server as part of the demo application.
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('City Permitting Portal initialized');
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize application tracking
    initializeApplicationTracking();
    
    // Initialize dashboard functionality
    initializeDashboard();
    
    // Initialize smooth scrolling for navigation
    initializeSmoothScrolling();
});

/**
 * Initialize form handling and validation
 */
function initializeFormHandling() {
    const permitForm = document.querySelector('.usa-form');
    if (permitForm) {
        permitForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Add dynamic form validation
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
    });
    
    // Handle permit type selection
    const permitTypeRadios = document.querySelectorAll('input[name="permit-type"]');
    permitTypeRadios.forEach(radio => {
        radio.addEventListener('change', handlePermitTypeChange);
    });
}

/**
 * Handle form submission
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const applicationData = Object.fromEntries(formData);
    
    // Simulate form submission
    showSubmissionConfirmation(applicationData);
}

/**
 * Show submission confirmation
 */
function showSubmissionConfirmation(applicationData) {
    const applicationId = generateApplicationId(applicationData['permit-type']);
    
    // Create success alert
    const alertHTML = `
        <div class="usa-alert usa-alert--success margin-bottom-2" role="alert">
            <div class="usa-alert__body">
                <h4 class="usa-alert__heading">Application Submitted Successfully!</h4>
                <p class="usa-alert__text">
                    Your application has been submitted with ID: <strong>${applicationId}</strong>
                    <br>You will receive an email confirmation shortly.
                </p>
            </div>
        </div>
    `;
    
    // Insert alert at top of form section
    const formSection = document.querySelector('.permit-form-section');
    formSection.insertAdjacentHTML('afterbegin', alertHTML);
    
    // Scroll to top of form
    formSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generate application ID
 */
function generateApplicationId(permitType) {
    const typeCode = {
        'building': 'BP',
        'electrical': 'EP',
        'plumbing': 'PP',
        'mechanical': 'MP'
    };
    
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    
    return `${typeCode[permitType] || 'GP'}-${year}-${randomNum}`;
}

/**
 * Initialize application tracking functionality
 */
function initializeApplicationTracking() {
    const searchField = document.getElementById('search-field');
    const searchButton = document.querySelector('.usa-search button');
    
    if (searchField && searchButton) {
        searchButton.addEventListener('click', handleApplicationSearch);
        searchField.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleApplicationSearch(event);
            }
        });
    }
}

/**
 * Handle application search
 */
function handleApplicationSearch(event) {
    event.preventDefault();
    
    const searchField = document.getElementById('search-field');
    const applicationId = searchField.value.trim();
    
    if (applicationId) {
        // Simulate application lookup
        simulateApplicationLookup(applicationId);
    } else {
        showSearchError('Please enter an application ID');
    }
}

/**
 * Simulate application lookup
 */
function simulateApplicationLookup(applicationId) {
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoadingState();
        
        // Mock application data
        const mockApplication = {
            id: applicationId,
            type: 'Building Permit - Deck Addition',
            property: '123 Main Street, Springfield, IL',
            status: 'Under Review',
            submitted: 'March 15, 2024',
            reviewer: 'Sarah Johnson'
        };
        
        displayApplicationStatus(mockApplication);
    }, 1500);
}

/**
 * Initialize dashboard functionality
 */
function initializeDashboard() {
    // Add click handlers for dashboard cards
    const dashboardCards = document.querySelectorAll('.usa-card');
    dashboardCards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
    
    // Animate statistics on scroll
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        const observer = new IntersectionObserver(animateStats, {
            threshold: 0.5
        });
        
        statCards.forEach(card => {
            observer.observe(card);
        });
    }
}

/**
 * Animate statistics when they come into view
 */
function animateStats(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                animateNumber(statNumber);
                statNumber.dataset.animated = 'true';
            }
        }
    });
}

/**
 * Animate number counting up
 */
function animateNumber(element) {
    const finalNumber = parseInt(element.textContent);
    const duration = 1000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = finalNumber / steps;
    
    let currentNumber = 0;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = finalNumber;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentNumber);
        }
    }, stepTime);
}

/**
 * Initialize smooth scrolling for navigation
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}