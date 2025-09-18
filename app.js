// Portfolio JavaScript - iOS 26 Inspired Glassmorphism Effects

// Restrict right-click and block source view shortcuts
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
document.addEventListener('keydown', function(e) {
    // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'|| e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && e.key === 'U') || (e.ctrlKey && e.key === 'u')
    ) {
        e.preventDefault();
        return false;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initParticleEffect();
    initNavigationHighlight();
    initGlassEffects();
    initTypingEffect();
    initAccessibility();
    initPerformanceOptimizations();
    
    // SEO and performance enhancements
    initLazyLoading();
    initSEOEnhancements();
    
    console.log('Portfolio loaded successfully - SEO optimized');
});

// Enhanced smooth scrolling for navigation links - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Use native smooth scrolling with fallback
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older browsers
                    smoothScrollTo(offsetTop, 800);
                }
                
                // Update URL for SEO without triggering page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Custom smooth scroll function with easing (fallback)
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// Easing function for smooth animations
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

// Enhanced scroll-triggered animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    entry.target.style.transitionDelay = `${delay}ms`;
                }, delay);
                
                // Stop observing once animated for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// iOS 26 inspired enhanced glass effects
function initGlassEffects() {
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        // Enhanced hover effects with multiple transforms
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
            
            // Add light reflection effect
            addLightReflection(this, x, y);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            
            // Remove light reflection
            const reflection = this.querySelector('.light-reflection');
            if (reflection) {
                reflection.remove();
            }
        });
        
        // Mouse move effect for dynamic lighting
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            updateLightReflection(this, x, y);
        });
    });
    
    // Enhanced button effects with iOS 26 styling
    const buttons = document.querySelectorAll('.btn-glass, .social-link, .skill-tag, .tech-tag');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Enhanced ripple effect with better visual feedback
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
            
            // Haptic-like feedback through micro-animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Add dynamic light reflection effect
function addLightReflection(element, x, y) {
    const reflection = document.createElement('div');
    reflection.className = 'light-reflection';
    reflection.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        left: ${x - 50}px;
        top: ${y - 50}px;
        transition: all 0.3s ease;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(reflection);
}

// Update light reflection position
function updateLightReflection(element, x, y) {
    const reflection = element.querySelector('.light-reflection');
    if (reflection) {
        reflection.style.left = `${x - 50}px`;
        reflection.style.top = `${y - 50}px`;
    }
}

// Enhanced ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Navigation highlight with enhanced visual feedback - Fixed
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNav() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.background = 'transparent';
            link.style.boxShadow = 'none';
            
            if (link.getAttribute('href') === `#${current}`) {
                link.style.background = 'rgba(255, 255, 255, 0.25)';
                link.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Throttled scroll handler for better performance
    const throttledHighlight = throttle(highlightNav, 16);
    window.addEventListener('scroll', throttledHighlight);
    highlightNav(); // Initial call
}

// Enhanced particle background system
function initParticleEffect() {
    const particlesContainer = document.getElementById('particles-background');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 60 : 30;
    
    // Create particles with different types and behaviors
    for (let i = 0; i < particleCount; i++) {
        createAdvancedParticle(i);
    }
    
    function createAdvancedParticle(index) {
        const particle = document.createElement('div');
        const types = ['normal', 'glow', 'sparkle'];
        const type = types[Math.floor(Math.random() * types.length)];
        const size = Math.random() * 6 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.6 + 0.2;
        
        let backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        let boxShadow = 'none';
        
        if (type === 'glow') {
            backgroundColor = `rgba(120, 200, 255, ${opacity * 0.8})`;
            boxShadow = `0 0 ${size * 2}px rgba(120, 200, 255, 0.5)`;
        } else if (type === 'sparkle') {
            backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            boxShadow = `0 0 ${size}px rgba(255, 255, 255, 0.8)`;
        }
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${backgroundColor};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            box-shadow: ${boxShadow};
            animation: float ${duration}s linear infinite ${delay}s;
            pointer-events: none;
            will-change: transform;
        `;
        
        particle.className = `particle particle-${type}`;
        particlesContainer.appendChild(particle);
    }
}

// Typing effect for hero section
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    const typingSpeed = 80;
    const pauseTime = 1000;
    
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
    
    function typeText() {
        let i = 0;
        const timer = setInterval(() => {
            subtitle.textContent += originalText.charAt(i);
            i++;
            
            if (i >= originalText.length) {
                clearInterval(timer);
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, pauseTime);
            }
        }, typingSpeed);
    }
    
    // Start typing effect after initial page load
    setTimeout(typeText, 1500);
}

// Enhanced accessibility features
function initAccessibility() {
    // Improved focus management
    const focusableElements = document.querySelectorAll(
        'a, button, .btn-glass, .skill-tag, .tech-tag, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(255, 255, 255, 0.8)';
            this.style.outlineOffset = '2px';
            this.style.zIndex = '10';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.zIndex = '';
        });
        
        // Keyboard navigation support
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add proper ARIA attributes dynamically
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    skillTags.forEach((tag, index) => {
        tag.setAttribute('role', 'button');
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('aria-label', `Technology: ${tag.textContent}`);
    });
    
    // Add skip links for better accessibility
    addSkipLinks();
}

// Add skip links for screen readers
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Throttle resize events
    const handleResize = throttle(() => {
        // Recalculate particles on resize
        const particlesContainer = document.getElementById('particles-background');
        if (particlesContainer) {
            const currentParticles = particlesContainer.children.length;
            const targetParticles = window.innerWidth > 768 ? 60 : 30;
            
            if (currentParticles !== targetParticles) {
                particlesContainer.innerHTML = '';
                initParticleEffect();
            }
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Optimize scroll events
    const scrollHandler = throttle(() => {
        requestAnimationFrame(() => {
            initParallaxEffect();
        });
    }, 16);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Lazy loading implementation
function initLazyLoading() {
    // Lazy load heavy animations and effects
    const heavyElements = document.querySelectorAll('.projects-grid, .skills-grid');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });
    
    heavyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// SEO enhancements
function initSEOEnhancements() {
    // Update page title based on current section
    const sections = document.querySelectorAll('section[id]');
    const originalTitle = document.title;
    
    const sectionTitles = {
        'hero': 'Rajesh Kumar | AI & Full Stack Developer',
        'about': 'About - Rajesh Kumar | Software Engineer',
        'achievements': 'Achievements - Rajesh Kumar | Professional Recognition',
        'skills': 'Skills - Rajesh Kumar | Technical Expertise',
        'experience': 'Experience - Rajesh Kumar | Professional Journey',
        'projects': 'Projects - Rajesh Kumar | Portfolio',
        'education': 'Education - Rajesh Kumar | Academic Background',
        'contact': 'Contact - Rajesh Kumar | Get In Touch'
    };
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const newTitle = sectionTitles[sectionId] || originalTitle;
                if (document.title !== newTitle) {
                    document.title = newTitle;
                }
            }
        });
    }, { threshold: 0.7 });
    
    sections.forEach(section => {
        titleObserver.observe(section);
    });
}

// Parallax effect for depth
function initParallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('#particles-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Utility: Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced mobile navigation
function initMobileNavigation() {
    if (window.innerWidth <= 768) {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Add visual feedback for mobile taps
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Contact form interactions with enhanced feedback
function initContactInteractions() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Add success notification for email/phone clicks
            if (this.href.includes('mailto:') || this.href.includes('tel:')) {
                showNotification('Contact information accessed!');
            }
        });
        
        // Copy to clipboard functionality
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const text = this.href.replace('mailto:', '').replace('tel:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Copied to clipboard!');
                });
            }
        });
    });
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .particle-glow {
        animation-timing-function: ease-in-out;
    }
    
    .particle-sparkle {
        animation-duration: 20s !important;
    }
    
    .loaded .glass-card {
        animation: cardLoadIn 0.6s ease-out;
    }
    
    @keyframes cardLoadIn {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Initialize additional features on load
window.addEventListener('load', function() {
    initMobileNavigation();
    initContactInteractions();
    
    // Mark page as fully loaded for analytics
    document.body.classList.add('fully-loaded');
    
    // Performance monitoring
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    }
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', function() {
    const particles = document.querySelectorAll('.particle');
    
    if (document.hidden) {
        // Pause animations when page is not visible
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
    // Graceful fallback for failed features
});

// Service worker registration for PWA capabilities (SEO boost)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Note: Service worker would need to be implemented separately
        console.log('ServiceWorker support detected');
    });
}