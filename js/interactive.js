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
    const sections = document.querySelectorAll('[id^=""]');
    
    // Get all section elements
    const sectionElements = {
        home: document.getElementById('home'),
        games: document.getElementById('games'),
        data: document.getElementById('data'),
        about: document.getElementById('about'),
        contact: document.getElementById('contact')
    };

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

    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        Object.keys(sectionElements).forEach(section => {
            const element = sectionElements[section];
            if (element) {
                const sectionTop = element.offsetTop;
                const sectionHeight = element.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section;
                }
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
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
