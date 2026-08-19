// Basic interactivity: nav toggle, smooth scroll, theme toggle, contact handler
// Contact form wired to Formspree (https://formspree.io/f/moeapzek) with honeypot and reCAPTCHA support

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

  // contact form (wired to Formspree) with honeypot check and reCAPTCHA integration
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check: if the hidden "website" field has a value, treat as spam
    const hp = document.getElementById('hp_website');
    if (hp && hp.value.trim() !== '') {
      console.warn('Honeypot triggered — blocking submission');
      status.textContent = 'Message blocked (spam detected).';
      return;
    }

    // If reCAPTCHA is present, the widget will add a g-recaptcha-response field automatically
    const formData = new FormData(form);

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (resp.ok) {
        status.textContent = 'Thanks — your message was sent.';
        form.reset();
        // When using reCAPTCHA, reset the widget if available
        if (window.grecaptcha && typeof window.grecaptcha.reset === 'function') {
          try { window.grecaptcha.reset(); } catch (err) { /* ignore */ }
        }
        setTimeout(() => { status.textContent = ''; }, 5000);
      } else {
        const data = await resp.json().catch(() => ({}));
        status.textContent = data.error || 'Sorry — there was a problem sending your message.';
      }
    } catch (err) {
      console.error('Form submission error', err);
      status.textContent = 'Network error — please try again later.';
    }
  });

  // set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
