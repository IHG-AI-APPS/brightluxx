/**
 * reCAPTCHA v3 utility — loads script once, provides token/header helpers.
 * Gracefully skips if REACT_APP_RECAPTCHA_SITE_KEY is not set.
 */
const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

let scriptLoaded = false;

export function loadRecaptchaScript() {
  if (!SITE_KEY || scriptLoaded) return;
  if (document.querySelector('script[src*="recaptcha/api.js"]')) {
    scriptLoaded = true;
    return;
  }
  const s = document.createElement('script');
  s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
  s.async = true;
  s.defer = true;
  s.onload = () => { scriptLoaded = true; };
  document.body.appendChild(s);
}

export async function getRecaptchaToken(action = 'submit') {
  if (!SITE_KEY) return '';
  // Wait for script to load (up to 5s)
  for (let i = 0; i < 50 && !window.grecaptcha; i++) {
    await new Promise(r => setTimeout(r, 100));
  }
  if (!window.grecaptcha) return '';
  try {
    return await new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(SITE_KEY, { action }).then(resolve).catch(() => resolve(''));
      });
    });
  } catch {
    return '';
  }
}

export async function getRecaptchaHeaders(action = 'submit') {
  const token = await getRecaptchaToken(action);
  return token ? { 'X-Recaptcha-Token': token } : {};
}

export const recaptchaEnabled = !!SITE_KEY;
