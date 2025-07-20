// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    // Initialize all components
    initializeNavigation();
    initializeHeroSection();
    initializeAnimations();
    initializeCarousels();
    initializeFilters();
    initializeGallery();
    initializeForms();
    initializeScrollEffects();
    initializeUtilities();
}
// Hero Slideshow JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // Show first slide initially
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // Function to show next slide
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide (loop back to 0 when reaching the end)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Auto-advance slides every 3 seconds
    // You can adjust this timing as needed
    setInterval(nextSlide, 6000);
});

// ======================
// NAVIGATION SYSTEM
// ======================
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('#header');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (hamburger?.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement);
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', highlightActiveNavLink);

    function highlightActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
}

// ======================
// HERO SECTION FUNCTIONALITY
// ======================
function initializeHeroSection() {
    // View Projects button - scroll to projects section
    const viewProjectsBtn = document.querySelector('.btn-primary');
    viewProjectsBtn?.addEventListener('click', function() {
        const projectsSection = document.querySelector('#ongoing-projects');
        if (projectsSection) {
            smoothScrollTo(projectsSection);
            initializeProgressBars(); // Initialize progress bars when scrolling to projects
        }
    });

    // Get Quote button - scroll to contact section
    const getQuoteBtn = document.querySelector('.btn-secondary');
    getQuoteBtn?.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) smoothScrollTo(contactSection);
    });

    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        animateCounter(number, target);
    });

    // Scroll down indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator?.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) smoothScrollTo(aboutSection);
    });
}

// ======================
// ANIMATION SYSTEM
// ======================
function initializeAnimations() {
    // Fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
}

// ======================
// PROGRESS BARS FUNCTIONALITY
// ======================
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        // Get progress from data attribute or inline style
        const progress = bar.dataset.progress || bar.style.width || '100%';
        
        // Reset and animate
        bar.style.width = '0%';
        bar.style.transition = 'none';
        
        // Trigger reflow
        void bar.offsetWidth;
        
        // Animate to target width
        bar.style.transition = 'width 1.5s ease-out';
        bar.style.width = progress;
    });
}

// ======================
// TESTIMONIAL CAROUSEL
// ======================
function initializeCarousels() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
            
            if (i === index) {
                const stars = testimonial.querySelectorAll('.star');
                stars.forEach((star, starIndex) => {
                    setTimeout(() => {
                        star.classList.add('animate-fill');
                    }, starIndex * 100);
                });
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    prevBtn?.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        startAutoSlide();
    });

    nextBtn?.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
    });

    if (testimonials.length > 0) {
        showTestimonial(0);
        startAutoSlide();
    }
}

// ======================
// UTILITY FUNCTIONS
// ======================
function smoothScrollTo(element) {
    const header = document.querySelector('#header');
    const headerHeight = header?.offsetHeight || 0;
    const targetPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function animateCounter(element, target) {
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(count) + '+';
    }, 16);
}

function initializeFilters() {
    // Filter buttons functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.completed-card').forEach(card => {
                card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
            });
        });
    });
}

function initializeGallery() {
    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.querySelector('.zoom-btn')?.addEventListener('click', showModal);
    });
}

function showModal() {
    // Modal display logic
}

function initializeForms() {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Form validation and submission
    });
}

function initializeScrollEffects() {
    // Scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.title = 'Back to top';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeUtilities() {
    // Other utility functions
}
