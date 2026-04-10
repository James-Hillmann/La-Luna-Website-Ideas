// La Luna RGA — Concept 2 JS

(function () {
  'use strict';

  /* ---- Sticky header ---- */
  const header = document.getElementById('site-header');
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
    });

    nav.querySelectorAll('.has-dropdown > a').forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (!link.closest('.has-dropdown') || link.closest('.dropdown')) {
          nav.classList.remove('open');
          hamburger.classList.remove('open');
        }
      });
    });
  }

  /* ---- Back to top ---- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Testimonial rotator ---- */
  const testimonials = [
    {
      quote: '"Choosing La Luna Gymnastics School for our daughter was one of the best decisions we\'ve made as parents. From day one, the staff made her feel welcome and valued. Watching her confidence soar and witnessing her master challenging routines is incredibly rewarding."',
      name: 'Jason Lee',
      role: 'Satisfied Parent'
    },
    {
      quote: '"We have been part of the La Luna Gymnastics family for several years now, and we couldn\'t be happier. The progress our two daughters have made is astonishing — they eagerly look forward to every session and their passion continues to grow each day."',
      name: 'Jessica Patel',
      role: 'Parent of Two Gymnasts'
    },
    {
      quote: '"La Luna truly stands out. They prioritize safety and ensure each child\'s well-being while pushing them to achieve their personal best. Our daughter has flourished under the guidance of the dedicated coaches — we\'re grateful for the lifelong skills she\'s gained."',
      name: 'Matthew Gonzalez',
      role: 'Satisfied Parent'
    }
  ];

  const quoteEl  = document.getElementById('testimonial-quote');
  const nameEl   = document.getElementById('testimonial-name');
  const roleEl   = document.getElementById('testimonial-role');
  const dotsEl   = document.getElementById('testimonial-dots');

  if (quoteEl && nameEl && dotsEl) {
    let current = 0;

    function renderDots() {
      dotsEl.innerHTML = '';
      testimonials.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'testimonial-dot' + (i === current ? ' active' : '');
        btn.setAttribute('aria-label', `Testimonial ${i + 1}`);
        btn.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(btn);
      });
    }

    function goTo(index) {
      current = index;
      quoteEl.style.opacity = '0';
      quoteEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        quoteEl.textContent = testimonials[current].quote;
        nameEl.textContent  = testimonials[current].name;
        roleEl.textContent  = testimonials[current].role;
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
        renderDots();
      }, 250);
    }

    quoteEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    renderDots();

    // Auto-rotate every 6s
    setInterval(() => goTo((current + 1) % testimonials.length), 6000);
  }

  /* ---- Scroll-in animations ---- */
  const animateTargets = document.querySelectorAll(
    '.benefit-item, .program-row, .testimonial-card, .value-item, .gallery-grid-item, .coach-card, .contact-info-block'
  );

  if ('IntersectionObserver' in window && animateTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    animateTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.07}s, transform 0.5s ease ${(i % 4) * 0.07}s`;
      observer.observe(el);
    });
  }

})();
