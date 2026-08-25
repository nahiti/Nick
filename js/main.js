/* =========================================================
   America's Best Home Healthcare — Scripts
========================================================= */

(function () {
  'use strict';

  /* ---------- Navigation Scroll & Mobile Toggle ---------- */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (burger && links) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !expanded);
      links.classList.toggle('is-open');
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Doccure Quick Search Action ---------- */
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  const heroCareSelect = document.getElementById('heroCareSelect');

  if (heroSearchBtn && heroCareSelect) {
    heroSearchBtn.addEventListener('click', () => {
      const selectedVal = heroCareSelect.value;
      const targetBtn = document.querySelector(`.tab-btn[data-category="${selectedVal}"]`);
      
      if (targetBtn) {
        targetBtn.click();
      }
      
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---------- Hero Cursor Parallax Motion ---------- */
  const heroVisual = document.getElementById('heroVisual');
  if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 10;
      const yPos = (clientY / window.innerHeight - 0.5) * 10;

      heroVisual.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    });
  }

  /* ---------- Dynamic Text Transition ---------- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const phrases = ['Home.', 'First.', 'Always.'];
    let idx = 0;

    setInterval(() => {
      idx = (idx + 1) % phrases.length;
      typedEl.style.opacity = '0';
      setTimeout(() => {
        typedEl.textContent = phrases[idx];
        typedEl.style.opacity = '1';
      }, 200);
    }, 2800);
  }

  /* ---------- Service Tab Categorization ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const category = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          countObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));
  }

  /* ---------- Scroll Reveal Observer ---------- */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Contact Form Validation ---------- */
  const form = document.getElementById('contactForm');
  const formOk = document.getElementById('formOk');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fields = form.querySelectorAll('[required]');
      fields.forEach(field => {
        const parent = field.closest('.form__field');
        if (!field.value.trim()) {
          parent.classList.add('has-error');
          isValid = false;
        } else {
          parent.classList.remove('has-error');
        }
      });

      if (isValid) {
        formOk.classList.add('show');
        form.reset();
        setTimeout(() => formOk.classList.remove('show'), 5000);
      }
    });
  }
})();