// Smooth Scrolling and Navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // === INTERACTIVE ANIMATED BACKGROUND ===
    (function initAnimatedBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'bgCanvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.insertBefore(canvas, document.body.firstChild);
        
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        // Create animated particles
        const particles = [];
        const particleCount = Math.min(60, Math.max(30, (w * h) / 50000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }

        function animateBackground() {
            // Dark gradient background
            const gradient = ctx.createLinearGradient(0, 0, w, h);
            gradient.addColorStop(0, 'rgba(10, 15, 35, 0.95)');
            gradient.addColorStop(0.5, 'rgba(15, 20, 40, 0.95)');
            gradient.addColorStop(1, 'rgba(8, 12, 30, 0.95)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            // Draw and update particles
            particles.forEach((p, idx) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += 0.02;

                // Wrap around edges
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Draw glowing particle
                const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
                glow.addColorStop(0, `rgba(100, 150, 255, ${pulseAlpha})`);
                glow.addColorStop(0.7, `rgba(100, 150, 255, ${pulseAlpha * 0.3})`);
                glow.addColorStop(1, 'rgba(100, 150, 255, 0)');
                
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw connecting lines between nearby particles
            ctx.strokeStyle = 'rgba(100, 150, 255, 0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.globalAlpha = 0.1 * (1 - distance / 150);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            requestAnimationFrame(animateBackground);
        }
        animateBackground();
    })();
    // === END ANIMATED BACKGROUND ===

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            updateHamburger();
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            updateHamburger();
        });
    });

    // Update hamburger animation
    function updateHamburger() {
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // CTA buttons smooth scroll
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // === HIDE SQL FROM PROGRAMMING LANGUAGES ===
    (function hideSqlLanguages() {
        const languageElements = document.querySelectorAll('[class*="skill"], [class*="language"], [class*="prog"], li');
        languageElements.forEach(el => {
            const text = (el.textContent || '').toLowerCase().trim();
            if (text === 'sql' || text.includes('sql')) {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
            }
        });
    })();
    // === END HIDE SQL ===

    // === ENHANCE CONTACT LINKS VISIBILITY & REMOVE UNDERLINES ===
    (function enhanceContactLinks() {
        const contactStyle = document.createElement('style');
        contactStyle.setAttribute('data-contact-style', 'true');
        contactStyle.textContent = `
            /* Contact section links - High visibility without underlines */
            #contact a, 
            .contact a, 
            .contact-section a,
            .contact-info a {
                color: #ffffff !important;
                font-weight: 600 !important;
                text-decoration: none !important;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8) !important;
                opacity: 1 !important;
                transition: all 0.3s ease !important;
                padding: 8px 12px;
                display: inline-block;
                border-radius: 4px;
            }

            #contact a:hover, 
            .contact a:hover, 
            .contact-section a:hover,
            .contact-info a:hover {
                color: var(--primary-color, #66b2ff) !important;
                background: rgba(102, 178, 255, 0.15) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 12px rgba(102, 178, 255, 0.3) !important;
            }

            #contact a:focus, 
            .contact a:focus,
            .contact-info a:focus {
                outline: 2px solid var(--primary-color, #66b2ff) !important;
                outline-offset: 2px !important;
            }

            /* Contact labels and text */
            #contact label,
            .contact-label,
            .contact-text {
                color: #e0e0e0 !important;
                font-size: 1.05rem !important;
            }

            /* Email and phone links - NO UNDERLINES */
            a[href^="mailto:"],
            a[href^="tel:"] {
                color: #ffffff !important;
                font-weight: 600 !important;
                text-decoration: none !important;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8) !important;
            }

            a[href^="mailto:"]:hover,
            a[href^="tel:"]:hover {
                color: var(--primary-color, #66b2ff) !important;
            }
        `;
        document.head.appendChild(contactStyle);

        // Force enable all contact links
        const allContactLinks = document.querySelectorAll('#contact a, .contact a, a[href^="mailto:"], a[href^="tel:"]');
        allContactLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = '1';
            link.style.visibility = 'visible';
            link.style.display = 'inline-block';
            link.style.textDecoration = 'none';
        });
    })();
    // === END ENHANCE CONTACT LINKS ===

    // === UPDATE ABOUT ME SECTION CONTENT ===
    (function updateAboutSection() {
        const aboutContent = document.querySelector('#about .about-content') || 
                            document.querySelector('#about p') ||
                            document.querySelector('.about-text');
        
        if (aboutContent) {
            aboutContent.innerHTML = `
                <p>I am an aspiring <strong>AI & Machine Learning Engineer</strong> with a strong foundation in <strong>Python, SQL, and applied machine learning</strong>, supported by hands-on internships and production-level projects.</p>

                <p>I have proven experience in <strong>designing, training, evaluating, and deploying ML models</strong>, including end-to-end data pipelines and real-world applications. My technical expertise spans <strong>machine learning, deep learning, generative AI</strong>, and backend integration using <strong>Flask and Streamlit</strong>.</p>

                <p>Through projects such as a <strong>Crypto Liquidity Predictor</strong>, I have built complete ML solutions involving <strong>data preprocessing, exploratory data analysis, feature engineering, and model deployment</strong>. I have developed interactive web applications to serve trained models, implemented <strong>Random Forest regression</strong>, and documented projects with clear EDA and system design reports.</p>

                <p>I bring a <strong>strong problem-solving mindset</strong>, with the ability to translate data into <strong>scalable, data-driven solutions</strong>, and I actively sharpen my skills through advanced coursework, competitive platforms, and continuous experimentation with modern AI tools and frameworks.</p>
            `;
        }
    })();
    // === END ABOUT SECTION UPDATE ===

    // Intersection Observer for animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe experience cards
    const experienceCards = document.querySelectorAll('.experience-header');
    experienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe certification cards
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add active state to navigation based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = 'var(--text-dark)';
            }
        });
    });

    // Form or email link handling
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Email links will open the default email client
        });
    });

    // External links handling
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Navigating to:', this.href);
        });
    });

    console.log('Portfolio initialized successfully!');
});

// Track page analytics
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
}

// Export functions for external use
window.portfolioUtils = {
    trackEvent: trackEvent,
    smoothScroll: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};