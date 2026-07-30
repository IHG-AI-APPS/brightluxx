import { useEffect, useRef, useCallback } from 'react';

const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

/**
 * Hook for Google reCAPTCHA v3 (invisible).
 * Loads the script once, provides getToken() for form submissions.
 * Gracefully skips if REACT_APP_RECAPTCHA_SITE_KEY is not configured.
 *
 * Usage:
 *   const { getToken, getHeaders } = useRecaptcha();
 *   const headers = await getHeaders('contact_form');
 *   fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body });
 */
export default function useRecaptcha() {
  const loaded = useRef(false);

  useEffect(() => {
    if (!SITE_KEY || loaded.current) return;
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      loaded.current = true;
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => { loaded.current = true; };
    document.body.appendChild(script);
  }, []);

  const getToken = useCallback(async (action = 'submit') => {
    if (!SITE_KEY || !window.grecaptcha) return '';
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action })
          .then(resolve)
          .catch(() => resolve(''));
      });
    });
  }, []);

  const getHeaders = useCallback(async (action = 'submit') => {
    const token = await getToken(action);
    return token ? { 'X-Recaptcha-Token': token } : {};
  }, [getToken]);

  return { getToken, getHeaders, enabled: !!SITE_KEY };
}
