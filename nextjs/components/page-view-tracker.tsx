'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!api) return;
    fetch(`${api}/api/track`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', keepalive: true,
      body: JSON.stringify({ event: 'page_view', page: pathname, referrer: document.referrer || '', screen_width: window.innerWidth }),
    }).catch(() => undefined);
  }, [pathname]);
  return null;
}