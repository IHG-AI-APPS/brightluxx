import type { Metadata } from 'next';
import { PageViewTracker } from '../components/page-view-tracker';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { CookieConsent } from '../components/cookie-consent';
import { FloatingActions } from '../components/floating-actions';
import './styles.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://brightluxx.com'),
  title: { default: 'Brightluxx — Premium LED Display Solutions', template: '%s' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageViewTracker /><SiteHeader />{children}<SiteFooter /><FloatingActions /><CookieConsent /></body></html>;
}