/* ============================================================
   P SQUARE COMMERCIAL ACCOUNTANTS — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. TOPBAR SCROLL SHADOW ──────────────────────────────
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });


  // ── 2. SMOOTH SCROLL FOR ANY ANCHOR LINK ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = topbar.offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ── 3. SCROLL-TRIGGERED REVEAL ANIMATIONS ────────────────
  const revealSelectors = [
    '.service-card', '.branch-card', '.contact-item',
    '.cta-card', '.about-card-big', '.about-card-small',
    '.highlight', '.stat',
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.06}s`;
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  // ── 4. FLOATING BUTTON — FADE ON FOOTER ──────────────────
  const floatCall = document.querySelector('.float-call');
  const footer    = document.querySelector('.footer');
  if (floatCall && footer) {
    new IntersectionObserver(([entry]) => {
      floatCall.style.opacity       = entry.isIntersecting ? '0' : '1';
      floatCall.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.1 }).observe(footer);
  }


  // ── 5. AUTO-UPDATE COPYRIGHT YEAR ────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
