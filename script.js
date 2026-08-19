// Basic interactivity: nav toggle, smooth scroll, theme toggle, contact handler
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-pressed', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', String(!dark));
  });

  // contact form (client-only: replace with backend endpoint to actually send messages)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    // Example: send to a backend endpoint with fetch('/api/contact', {method:'POST', body: f})
    // For now show a friendly message:
    status.textContent = 'Thanks — message received (demo only).';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
    console.log('Contact form (demo):', Object.fromEntries(f));
  });

  // set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
