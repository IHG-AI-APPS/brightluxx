'use client';

type EventData = Record<string, string | number | string[]>;

function sessionId() {
  const key = 'blx_sid';
  let value = sessionStorage.getItem(key);
  if (!value) { value = `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`; sessionStorage.setItem(key, value); }
  return value;
}

export function trackEvent(event: string, details: EventData = {}) {
  fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', keepalive: true, body: JSON.stringify({ event, page: window.location.pathname, referrer: document.referrer || '', session_id: sessionId(), screen_width: window.innerWidth, ...details }) }).catch(() => undefined);
}