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