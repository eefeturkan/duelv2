// Mobile menu toggle function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const icon = menuToggle.querySelector('i');
    
    navLinks.classList.toggle('mobile-open');
    
    if (navLinks.classList.contains('mobile-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    function updateNavbar() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 1);
        
        if (scrolled > 50) {
            navbar.style.background = `rgba(7, 11, 35, ${0.2 + opacity * 0.3})`;
            navbar.style.backdropFilter = `blur(${20 + opacity * 10}px) saturate(${160 + opacity * 40}%)`;
            navbar.style.borderBottomColor = `rgba(74, 144, 226, ${0.2 + opacity * 0.3})`;
            navbar.style.boxShadow = `0 8px 32px rgba(74, 144, 226, ${0.1 + opacity * 0.2})`;
        } else {
            navbar.style.background = 'rgba(7, 11, 35, 0.4)';
            navbar.style.backdropFilter = 'blur(24px) saturate(180%)';
            navbar.style.borderBottomColor = 'rgba(74, 144, 226, 0.2)';
            navbar.style.boxShadow = '0 8px 32px rgba(74, 144, 226, 0.1)';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.culture-card, .position-card, .benefit-item, .hero-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Apply button functionality
    const applyButtons = document.querySelectorAll('.apply-btn');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the position title
            const positionCard = this.closest('.position-card');
            const positionTitle = positionCard.querySelector('h3').textContent;
            
            // Create URL-friendly job title
            const jobSlug = positionTitle.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // Open job detail page
                window.open(`job-detail.html?job=${jobSlug}&title=${encodeURIComponent(positionTitle)}`, '_blank');
            }, 150);
        });
    });
    
    // Parallax effect for hero orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
    }
    
    let parallaxTicking = false;
    
    function requestParallaxTick() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestParallaxTick();
        parallaxTicking = false;
    });
    
    // Smart typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Store the original text structure
        const baseText = 'Join the ';
        const revolutionText = 'Revolution';
        
        // Clear the title and rebuild it with typing animation
        heroTitle.innerHTML = '';
        
        let currentIndex = 0;
        
        function typeText() {
            if (currentIndex < baseText.length) {
                // Type the base text first
                heroTitle.textContent = baseText.substring(0, currentIndex + 1);
                currentIndex++;
                setTimeout(typeText, 80);
            } else if (currentIndex < baseText.length + revolutionText.length) {
                // Now type the "Revolution" part with gradient
                const revolutionIndex = currentIndex - baseText.length;
                const typedRevolution = revolutionText.substring(0, revolutionIndex + 1);
                
                heroTitle.innerHTML = baseText + '<span class="gradient-text">' + typedRevolution + '</span>';
                currentIndex++;
                setTimeout(typeText, 120);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 1000);
    }
    
    // Mouse follow effect for cards
    const cards = document.querySelectorAll('.culture-card, .position-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.apply-btn, .cta-button');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.hero-stats');
    
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    function animateStats() {
        stats.forEach((stat, index) => {
            const finalValue = stat.textContent;
            stat.textContent = '0';
            
            setTimeout(() => {
                if (finalValue === '100%') {
                    animateNumber(stat, 0, 100, 2000, '%');
                } else if (finalValue === '0%') {
                    animateNumber(stat, 100, 0, 2000, '%');
                } else if (finalValue === '∞') {
                    setTimeout(() => {
                        stat.textContent = '∞';
                    }, 1000);
                }
            }, index * 300);
        });
    }
    
    function animateNumber(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Console easter egg
    console.log(`
    ██████╗ ██╗   ██╗███████╗██╗     
    ██╔══██╗██║   ██║██╔════╝██║     
    ██║  ██║██║   ██║█████╗  ██║     
    ██║  ██║██║   ██║██╔══╝  ██║     
    ██████╔╝╚██████╔╝███████╗███████╗
    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
    
    🔥 Ready to join the revolution? 
    💜 careers@duel.com
    🚀 Built with passion, not profit.
    `);
}); 