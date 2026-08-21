'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '../lib/analytics';

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const query = searchParams.toString();
    trackEvent('page_view', { page: query ? `${pathname}?${query}` : pathname });
  }, [pathname, searchParams]);
  return null;
}