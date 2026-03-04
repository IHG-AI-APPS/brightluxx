/**
 * Lightweight analytics tracker for Brightluxx.
 * Sends page views and events to /api/track. No cookies, privacy-friendly.
 */
const API = process.env.REACT_APP_BACKEND_URL || '';

let sessionId = sessionStorage.getItem('blx_sid');
if (!sessionId) {
  sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  sessionStorage.setItem('blx_sid', sessionId);
}

function send(event, extra = {}) {
  const payload = {
    event,
    page: window.location.pathname,
    referrer: document.referrer || '',
    session_id: sessionId,
    screen_width: window.innerWidth,
    ...extra,
  };
  // Use sendBeacon for reliability (fires even on page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${API}/api/track`, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  } else {
    fetch(`${API}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

export function trackPageView(page) {
  send('page_view', { page: page || window.location.pathname });
}

export function trackProductView(slug, category) {
  send('product_view', { product_slug: slug, category });
}

export function trackCtaClick(ctaName) {
  send('cta_click', { page: ctaName });
}

export function trackQuoteRequest(productSlug) {
  send('quote_request', { product_slug: productSlug || '' });
}
