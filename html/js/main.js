/* Scroll Reveal */
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '\u2715' : '\u2630';
    });
  }

  /* Dropdown menus — click/touch support for accessibility */
  const dropdowns = document.querySelectorAll('.nav-links .dropdown');
  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('a');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      // On mobile or touch, toggle dropdown instead of navigating
      if (window.innerWidth <= 900 || 'ontouchstart' in window) {
        e.preventDefault();
        const wasOpen = dd.classList.contains('open');
        dropdowns.forEach(d => d.classList.remove('open'));
        if (!wasOpen) dd.classList.add('open');
      }
    });
  });
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('open'));
    }
  });

  /* Active nav link */
  const currentPath = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (href === currentPath || (currentPath === '' && href === '/')) {
      a.classList.add('active');
    }
  });

  /* ── Cookie Consent Banner ── */
  if (!localStorage.getItem('phpf-cookies-accepted')) {
    const banner = document.createElement('div');
    banner.id = 'cookie-popup';
    banner.innerHTML = `
      <div class="cookie-text">We use cookies on our website to see how you interact with it. By accepting, you agree to our use of such cookies. <a href="privacy.html">Privacy Policy</a>.</div>
      <div class="cookie-actions">
        <button id="cookie-settings" class="cookie-btn">Settings</button>
        <button id="cookie-accept" class="cookie-btn accept">Accept</button>
        <button id="cookie-close" class="cookie-close">&times;</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function() {
      localStorage.setItem('phpf-cookies-accepted', 'true');
      banner.classList.add('cookie-closing');
      setTimeout(function() { banner.remove(); }, 300);
    });
    document.getElementById('cookie-close').addEventListener('click', function() {
      localStorage.setItem('phpf-cookies-accepted', 'declined');
      banner.classList.add('cookie-closing');
      setTimeout(function() { banner.remove(); }, 300);
    });
    document.getElementById('cookie-settings').addEventListener('click', function() {
      window.location.href = 'privacy.html';
    });
  }
});
