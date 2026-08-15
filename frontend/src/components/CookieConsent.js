import React, { useState, useEffect } from 'react';

const CONSENT_KEY = 'brightluxx_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show on admin routes
    if (window.location.pathname.startsWith('/admin')) return;
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    // Opt-in PostHog
    if (window.posthog) {
      window.posthog.opt_in_capturing();
    }
    // Load GTM if not already loaded
    if (!document.querySelector('script[src*="googletagmanager"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PQX7M8JK';
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    }
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
    // Disable PostHog if declined
    if (window.posthog) {
      window.posthog.opt_out_capturing();
    }
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-consent-banner"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        background: 'rgba(5,5,8,0.97)',
        borderTop: '1px solid rgba(34,211,238,0.2)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p style={{
        color: '#e5e5e5',
        fontSize: '13px',
        lineHeight: '1.5',
        margin: 0,
        flex: '1 1 400px',
      }}>
        We use cookies and session recording to improve your experience and analyze site usage.
        By continuing to browse, you agree to our use of cookies in accordance with UAE data protection regulations.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          data-testid="cookie-decline-btn"
          onClick={decline}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#999',
            padding: '8px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Decline
        </button>
        <button
          data-testid="cookie-accept-btn"
          onClick={accept}
          style={{
            background: '#22d3ee',
            border: 'none',
            color: '#050508',
            padding: '8px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
