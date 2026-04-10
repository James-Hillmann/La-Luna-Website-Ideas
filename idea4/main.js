// La Luna RGA — Concept 4 JS
(function () {
  'use strict';

  const header = document.getElementById('site-header');
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (!a.closest('.has-dropdown') || a.closest('.dropdown')) {
          nav.classList.remove('open');
          hamburger.classList.remove('open');
        }
      });
    });
  }

  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const targets = document.querySelectorAll('.anim');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
    targets.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.07 + 's';
      io.observe(el);
    });
  } else {
    targets.forEach(el => el.classList.add('in'));
  }
})();
