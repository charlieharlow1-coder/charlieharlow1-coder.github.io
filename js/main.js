/* ============================================================
   CHARLIE HARLOW PORTFOLIO — MAIN JS
   ============================================================ */

// ---- Modal open/close ----

function openModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById('modal-overlay');
  if (!modal) return;

  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Scroll modal to top each time it opens
  const inner = modal.querySelector('.modal-inner');
  if (inner) inner.scrollTop = 0;
}

function closeModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById('modal-overlay');
  if (!modal) return;

  modal.classList.remove('active');

  // Only remove overlay if no other modals are open
  const anyOpen = document.querySelector('.modal.active');
  if (!anyOpen) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal.active').forEach(m => {
    m.classList.remove('active');
  });
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Keyboard: Escape to close ----
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeAllModals();
});

// ---- Keyboard: Enter/Space to open tiles ----
document.querySelectorAll('.project-tile').forEach(function (tile) {
  tile.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tile.click();
    }
  });
});

// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeAllModals();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- Fade-in on scroll (project tiles & sections) ----
const fadeEls = document.querySelectorAll('.project-tile, .about-inner, #contact .contact-inner');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(function (el) {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Inject fade-up CSS dynamically (keeps it out of main stylesheet)
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .project-tile:nth-child(2).fade-up { transition-delay: 0.1s; }
  .project-tile:nth-child(3).fade-up { transition-delay: 0.2s; }
  .project-tile:nth-child(4).fade-up { transition-delay: 0.05s; }
  .project-tile:nth-child(5).fade-up { transition-delay: 0.1s; }
`;
document.head.appendChild(fadeStyle);
