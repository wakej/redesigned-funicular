# redesigned-funicular — Homepage (Form spam protection)

This commit enhances the contact form with two anti-spam measures:

1) Honeypot field
- A hidden input named `website` is included in the form. Automated bots often fill every text field; if this field is non-empty the submission is blocked client-side.
- The honeypot is hidden visually but present in the DOM so human users won't see or fill it.

2) Google reCAPTCHA v2 (checkbox)
- The reCAPTCHA widget is included in the form (you must supply a site key).
- Steps to enable reCAPTCHA:
  1. Go to https://www.google.com/recaptcha/admin and create a new reCAPTCHA v2 site ("I'm not a robot" checkbox) for your domain (or for testing, you can use localhost).
  2. Take the Site Key and replace `YOUR_RECAPTCHA_SITE_KEY` in `index.html` (the `data-sitekey` attribute on the `.g-recaptcha` div).
  3. Optionally configure Formspree to validate reCAPTCHA on the server side if you require server verification. Many setups work by sending the `g-recaptcha-response` token to your backend or to the form provider for verification.

Notes:
- The honeypot is effective against basic bots. Combining it with reCAPTCHA gives stronger protection.
- Do NOT commit your reCAPTCHA secret key to the repository. The Site Key (public) is fine to include in client-side code; the Secret Key must be kept private (server-side) if you verify tokens yourself.

Testing:
- From the live site, submit the form as a normal user. If reCAPTCHA is set up correctly you will complete the captcha and see a success message.
- To test the honeypot locally, try filling the hidden `website` field and submitting; the site will show "Message blocked (spam detected)."

If you want, I can:
- Add serverless verification using a Netlify or Vercel function (ideal if you want to verify reCAPTCHA server-side and send via SendGrid). Reply with `VERCEL_VERIFY` or `NETLIFY_VERIFY` and I'll add the function scaffolding and instructions for setting the reCAPTCHA secret and an email API key.
