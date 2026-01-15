document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
})

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.down-icon').forEach(arrow => {
    arrow.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.top-icon').forEach(arrow => {
    arrow.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.scroll-top-icon').forEach(arrow => {
    arrow.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const body = document.body;
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const drawerBackdrop = document.querySelector('.drawer-backdrop');
const drawer = document.querySelector('.mobile-drawer');

function closeMenu() {
    if (!body.classList.contains('menu-open')) return;
    body.classList.remove('menu-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    drawer?.setAttribute('aria-hidden', 'true');
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = body.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        drawer?.setAttribute('aria-hidden', String(!isOpen));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    drawerBackdrop?.addEventListener('click', closeMenu);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

function changeActiveLink() {
    const fromTop = window.scrollY + document.querySelector('.header').offsetHeight + 10;
    const absoluteTop = window.scrollY;
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }   
    });
    
    const downArrow = document.querySelectorAll('.down-icon');
    downArrow.forEach(arrow => {
        const section = document.querySelector(arrow.getAttribute('href'));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            arrow.classList.add('active');
        } else {
            arrow.classList.remove('active');
        }
    });
    
    const topArrow = document.querySelectorAll('.up-icon');
    topArrow.forEach(arrow => {
        const section = document.querySelector(arrow.getAttribute('href'));
        if (
            section.offsetTop <= absoluteTop &&
            section.offsetTop + section.offsetHeight > absoluteTop
        ) {
            arrow.classList.add('active');
        } else {
            arrow.classList.remove('active');
        }
    });
    
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        const section = document.querySelector(button.getAttribute('href'));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', changeActiveLink);

// -------------------------------------------- CAROUSEL FUNCTIONALITY --------------------------------------------

function initCarousel(containerSelector, cardSelector, prevBtnSelector, nextBtnSelector, cardsPerPageConfig) {
    const section = document.querySelector(containerSelector)?.closest('.section');
    if (!section) return;

    const container = section.querySelector(containerSelector);
    const cards = container?.querySelectorAll(cardSelector);
    const prevBtn = section.querySelector(prevBtnSelector);
    const nextBtn = section.querySelector(nextBtnSelector);

    if (!container || !cards || cards.length === 0 || !prevBtn || !nextBtn) return;

    let currentPage = 0;

    // Default config or custom config
    const config = cardsPerPageConfig || {
        1440: 6,
        1200: 4,
        768: 4,
        0: 2
    };

    function getCardsPerPage() {
        const width = window.innerWidth;
        const breakpoints = Object.keys(config).map(Number).sort((a, b) => b - a);
        for (const bp of breakpoints) {
            if (width >= bp) return config[bp];
        }
        return 2;
    }

    function getTotalPages() {
        const cardsPerPage = getCardsPerPage();
        return Math.ceil(cards.length / cardsPerPage);
    }

    function updateCarousel() {
        const cardsPerPage = getCardsPerPage();
        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        cards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Update button states
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= getTotalPages() - 1;

        prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPage >= getTotalPages() - 1 ? '0.5' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < getTotalPages() - 1) {
            currentPage++;
            updateCarousel();
        }
    });

    // Reset on resize
    window.addEventListener('resize', () => {
        const totalPages = getTotalPages();
        if (currentPage >= totalPages) {
            currentPage = Math.max(0, totalPages - 1);
        }
        updateCarousel();
    });

    // Initial update
    updateCarousel();
}

// Initialize carousels for each section
document.addEventListener('DOMContentLoaded', () => {
    // Skills: 12 on large desktop (6x2), 8 on tablet (4x2), 4 on mobile (2x2)
    const skillsConfig = { 1440: 12, 768: 8, 0: 4 };
    initCarousel('.skills-container', '.skill-card', '.previous-btn', '.next-btn', skillsConfig);

    // Hobbies, Projects, Work: 4 on desktop/tablet, 1 on mobile
    const cardsConfig = { 768: 4, 0: 1 };
    initCarousel('.hobbies-container', '.hobby-card', '.previous-btn', '.next-btn', cardsConfig);
    initCarousel('.projects-container', '.project-card', '.previous-btn', '.next-btn', cardsConfig);
    initCarousel('.work-container', '.work-card', '.previous-btn', '.next-btn', cardsConfig);
});

// -------------------------------------------- CONTACT FORM --------------------------------------------

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.backgroundColor = '#CC403B';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    });
}