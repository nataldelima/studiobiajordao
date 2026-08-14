document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       Menu Mobile Toggle
       ========================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    function toggleMenu() {
        const isOpen = mobileNav.classList.contains('open');
        mobileNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isOpen);
        mobileNav.setAttribute('aria-hidden', isOpen);
        
        // Bloqueia o scroll do body quando o menu está aberto
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       Sticky Header no Scroll
       ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       Intersection Observer para Animações
       ========================================== */
    // Respeitar configuração do sistema para animações
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: parar de observar após a animação acontecer uma vez
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /* ==========================================
       Smooth Scroll (Fallbacks / Ajustes finos)
       ========================================== */
    // O CSS 'scroll-behavior: smooth' já faz a maior parte do trabalho, 
    // mas se necessário adicionar offset para ancoras devido ao header fixo em Safari antigo:
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Deixa o CSS nativo atuar se suportado, senão poderia fazer scroll manual aqui
            }
        });
    });
});