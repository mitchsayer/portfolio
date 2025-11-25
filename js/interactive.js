// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out-quad',
    once: false,
    mirror: true,
    offset: 100
});

// Scroll Spy Navigation - Update active dot based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    if (navDots.length === 0) return; // Exit if no nav dots found

    // Function to update active section
    function updateActiveSection() {
        const scrollPos = window.scrollY;
        const viewportMid = scrollPos + window.innerHeight / 2;
        
        let activeSection = null;
        
        // Check each nav dot and its corresponding section
        navDots.forEach(dot => {
            const sectionId = dot.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollPos;
                const sectionBottom = rect.bottom + scrollPos;
                
                // Check if viewport is currently showing this section
                if (viewportMid >= sectionTop && viewportMid < sectionBottom) {
                    activeSection = sectionId;
                }
            }
        });
        
        // If no section is in middle of viewport, find the closest one below
        if (!activeSection) {
            let closestSection = null;
            let closestDistance = Infinity;
            
            navDots.forEach(dot => {
                const sectionId = dot.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + scrollPos;
                    
                    if (sectionTop <= viewportMid) {
                        const distance = viewportMid - sectionTop;
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestSection = sectionId;
                        }
                    }
                }
            });
            
            if (closestSection) {
                activeSection = closestSection;
            }
        }
        
        // Update all dots
        navDots.forEach(dot => {
            const sectionId = dot.getAttribute('data-section');
            if (sectionId === activeSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll on nav dot click
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Initial update
    updateActiveSection();
    
    // Update on scroll
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(updateActiveSection, 50);
    }, false);
});

// Enhanced Carousel with Auto-Advance and Swipe Support
(function() {
    let carouselIndex = 0;
    const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.carousel-item');
    const autoAdvanceInterval = 7000; // 7 seconds
    let autoAdvanceTimer;

    if (!carousel) return;

    // Auto-advance carousel
    function autoAdvance() {
        carouselIndex = (carouselIndex + 1) % items.length;
        showSlide(carouselIndex);
    }

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    // Start auto-advance
    function startAutoAdvance() {
        autoAdvanceTimer = setInterval(autoAdvance, autoAdvanceInterval);
    }

    // Stop auto-advance on user interaction
    function resetAutoAdvance() {
        clearInterval(autoAdvanceTimer);
        startAutoAdvance();
    }

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        resetAutoAdvance();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoAdvance();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next slide
                carouselIndex = (carouselIndex + 1) % items.length;
            } else {
                // Swiped right - previous slide
                carouselIndex = (carouselIndex - 1 + items.length) % items.length;
            }
            showSlide(carouselIndex);
        }
    }

    // Mouse events
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceTimer);
    });

    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Start auto-advance on load
    startAutoAdvance();
})();

// Parallax effect on scroll
(function() {
    const carousel = document.getElementById('carousel');
    
    if (!carousel) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const carouselRect = carousel.getBoundingClientRect();
        
        if (carouselRect.top < window.innerHeight) {
            const offset = scrollPosition * 0.5;
            carousel.style.backgroundPositionY = offset + 'px';
        }
    });
})();

// Re-initialize AOS when new content is loaded
window.addEventListener('load', () => {
    AOS.refresh();
});
