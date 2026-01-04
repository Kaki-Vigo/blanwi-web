// Animaciones de scroll y efectos interactivos
document.addEventListener('DOMContentLoaded', function() {
    
    // Animación de fade-in en scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos para animar
        const elementsToAnimate = document.querySelectorAll('.about-content, .feature-card, .phone-mockup, .cta-content');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Efectos de los botones
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Efecto de ripple
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Scroll suave para navegación
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animación del hero al cargar
    function initHeroAnimation() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Efecto parallax sutil en hero
    function initParallax() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }

    // Animación de las feature cards en hover
    function initFeatureCardAnimations() {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Contador animado (si necesitas mostrar números)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        });
    }

    // Efecto de typing en el hero title (opcional)
    function initTypingEffect() {
        const title = document.querySelector('.hero-title');
        const text = title.textContent;
        title.textContent = '';
        let index = 0;
        
        function typeChar() {
            if (index < text.length) {
                title.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 50);
            }
        }
        
        setTimeout(typeChar, 1000);
    }

    // Inicializar todas las funciones
    initScrollAnimations();
    initButtonEffects();
    initSmoothScroll();
    initHeroAnimation();
    initParallax();
    initFeatureCardAnimations();

    // CSS adicional para efectos de ripple
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Función para manejar el resize de la ventana
window.addEventListener('resize', function() {
    // Reajustar animaciones si es necesario
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function() {
        // Código para reajustar elementos si es necesario
    }, 250);
});

// Preloader simple (opcional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
