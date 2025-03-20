// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add active class to nav items based on scroll position
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .course-card, .testimonial, .footer-content > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Run animation function when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Simple carousel for testimonials on smaller screens
const createMobileCarousel = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
                testimonial.classList.add('active');
            } else {
                testimonial.style.display = 'none';
                testimonial.classList.remove('active');
            }
        });
    };
    
    // Show only the first testimonial initially on mobile
    const handleResize = () => {
        if (window.innerWidth < 768) {
            showTestimonial(currentIndex);
        } else {
            // On desktop, show all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'block';
            });
        }
    };
    
    // Auto advance the carousel
    const autoAdvance = () => {
        if (window.innerWidth < 768) {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }
    };
    
    // Initial setup
    handleResize();
    
    // Set up interval for auto-advancing
    setInterval(autoAdvance, 5000);
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
};

// Create mobile carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', createMobileCarousel);

// Add interactive elements to course cards
const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.course-icon img');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0)';
            }, 300);
        }
    });
});

// Create rainbow effect on section headers
const createRainbowEffect = () => {
    const rainbows = document.querySelectorAll('.rainbow-underline');
    
    rainbows.forEach(rainbow => {
        rainbow.style.backgroundPosition = '0px';
        
        // Animate the gradient
        let position = 0;
        setInterval(() => {
            position -= 1;
            rainbow.style.backgroundPosition = `${position}px 0`;
        }, 50);
    });
};

document.addEventListener('DOMContentLoaded', createRainbowEffect);

// Add confetti effect when clicking the "Enroll Now" button
const enrollButton = document.querySelector('.cta .btn.primary.large');

if (enrollButton) {
    enrollButton.addEventListener('click', (e) => {
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, and size
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${e.clientY - 20}px`;
            confetti.style.backgroundColor = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--purple)', 'var(--blue)'][Math.floor(Math.random() * 5)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            
            document.body.appendChild(confetti);
            
            // Animate falling
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0)', opacity: 1 },
                { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });
            
            // Remove confetti element after animation
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    });
}

// Add CSS for the confetti
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        z-index: 1000;
        border-radius: 50%;
        pointer-events: none;
    }
    
    .animated {
        animation: fadeUp 0.6s ease forwards;
    }
    
    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 