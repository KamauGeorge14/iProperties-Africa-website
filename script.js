const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.15
};

if (mobileMenuBtn && navigation) {
    mobileMenuBtn.addEventListener('click', () => {
        navigation.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', String(navigation.classList.contains('active')));
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        if (!targetElement) {
            return;
        }

        event.preventDefault();

        window.scrollTo({
            top: targetElement.offsetTop - 88,
            behavior: 'smooth'
        });

        if (navigation && mobileMenuBtn) {
            navigation.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

const revealOnScroll = (selector) => {
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') {
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    nodes.forEach((node, index) => {
        node.classList.add('reveal');
        node.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        revealObserver.observe(node);
    });
};

revealOnScroll('.property-card');
revealOnScroll('.service-card');
revealOnScroll('.testimonial-card');
revealOnScroll('.video-item');
revealOnScroll('.highlight');

if (header) {
    const updateHeaderState = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if (sections.length && navLinks.length && typeof IntersectionObserver !== 'undefined') {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.getAttribute('id');
            if (!id) {
                return;
            }

            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${id}`;
                link.classList.toggle('active', isActive);
            });
        });
    }, {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));
}

document.addEventListener('click', (event) => {
    if (!navigation || !mobileMenuBtn) {
        return;
    }
    const clickedInsideNav = navigation.contains(event.target);
    const clickedMenuButton = mobileMenuBtn.contains(event.target);
    if (!clickedInsideNav && !clickedMenuButton) {
        navigation.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

window.addEventListener('resize', () => {
    if (!navigation || !mobileMenuBtn) {
        return;
    }
    if (window.innerWidth > 768) {
        navigation.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formStatus = contactForm.querySelector('.form-status');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name || !email || !message) {
            if (formStatus) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.classList.add('is-error');
                formStatus.classList.remove('is-success');
            }
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (formStatus) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('is-error');
                formStatus.classList.remove('is-success');
            }
            return;
        }

        console.log('Form submitted:', { name, email, message });
        if (formStatus) {
            formStatus.textContent = 'Thank you for your message. We will get back to you soon.';
            formStatus.classList.add('is-success');
            formStatus.classList.remove('is-error');
        }
        this.reset();
    });
}