'use client';

import { SafeLink as Link } from './safe-link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavLink = readonly [string, string];
const productGroups: ReadonlyArray<{ title: string; links: readonly NavLink[] }> = [
  { title: 'BY PRODUCT', links: [['Indoor LED Displays', '/products?category=indoor'], ['Outdoor LED Displays', '/products?category=outdoor'], ['COB / MicroLED', '/products?category=cob-microled'], ['Transparent LED', '/products?category=transparent'], ['Interactive Displays', '/products?category=interactive'], ['Creative LED', '/products?category=flexible']] },
  { title: 'BY APPLICATION', links: [['Retail', '/solutions/retail'], ['Corporate', '/solutions/corporate'], ['Control Rooms', '/solutions/control-rooms'], ['Transportation', '/solutions/transportation'], ['Events & XR', '/solutions/entertainment'], ['Architecture', '/solutions/architecture']] },
  { title: 'BY TECHNOLOGY', links: [['COB Technology', '/technology/cob'], ['MicroLED & MiP', '/technology/microled'], ['Fine-Pitch LED', '/products?category=indoor'], ['Transparent LED', '/products?category=transparent'], ['Flexible LED', '/products?category=flexible'], ['Interactive Display', '/products?category=interactive']] },
];
const mobileLinks = [['Products', '/products'], ['Solutions', '/solutions'], ['Technology', '/technology'], ['Case Studies', '/case-studies'], ['Resources', '/resources'], ['For Architects', '/for-architects'], ['Contact', '/contact']];

export function SiteHeader() {
  const [open, setOpen] = useState<'products' | 'solutions' | 'more' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const close = () => { setOpen(null); setMobileOpen(false); };
  return <>
    <header className="site-header" data-testid="site-header-nav">
      <div className="site-header__inner">
        <Link href="/" className="site-logo" data-testid="logo-link"><img src="https://files.ihgbrands.com/assets_brightluxx-logo-nav.png" alt="Brightluxx" /></Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <button onClick={() => setOpen(open === 'products' ? null : 'products')} data-testid="nav-products">PRODUCTS <span>⌄</span></button>
          <button onClick={() => setOpen(open === 'solutions' ? null : 'solutions')} data-testid="nav-solutions">SOLUTIONS <span>⌄</span></button>
          <Link href="/lumimorph" data-testid="nav-lumimorph">LUMIMORPH</Link><Link href="/naturatex" data-testid="nav-naturatex">NATURATEX</Link><Link href="/signatouch" data-testid="nav-signatouch">SIGNATOUCH</Link><Link href="/glassmorph" data-testid="nav-glassmorph">GLASSMORPH</Link>
          <button onClick={() => setOpen(open === 'more' ? null : 'more')} data-testid="nav-more-btn">☰ <span>⌄</span></button>
        </nav>
        <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle navigation" data-testid="mobile-menu-toggle">{mobileOpen ? '×' : '☰'}</button>
        {open === 'products' && <div className="site-mega-menu" data-testid="products-mega-menu">{productGroups.map((group) => <section key={group.title}><p>{group.title}</p>{group.links.map(([label, href]) => <Link href={href} key={label} onClick={close} data-testid={`nav-product-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{label}</Link>)}</section>)}<div className="site-mega-menu__footer"><Link href="/products" onClick={close}>View All Products</Link><Link href="/products#product-finder" onClick={close}>Find the Right Display</Link><Link href="/compare" onClick={close}>Compare Displays</Link><Link href="/for-architects" onClick={close}>For Architects</Link></div></div>}
        {open === 'solutions' && <div className="site-small-menu" data-testid="nav-solutions-dropdown">{[['Retail & Hospitality', '/solutions/retail'], ['Corporate & Offices', '/solutions/corporate'], ['Entertainment & Events', '/solutions/entertainment'], ['Transportation', '/solutions/transportation'], ['Control Rooms', '/solutions/control-rooms'], ['Architecture', '/solutions/architecture'], ['Dubai', '/led-screen-suppliers-dubai'], ['Saudi Arabia', '/saudi-arabia']].map(([label, href]) => <Link href={href} key={label} onClick={close}>{label}</Link>)}</div>}
        {open === 'more' && <div className="site-small-menu site-small-menu--right" data-testid="nav-more-dropdown">{[['Technology', '/technology'], ['Calculators', '/tools'], ['Blog', '/blog'], ['Resources', '/resources'], ['Projects', '/projects'], ['About Us', '/about'], ['Contact Us', '/contact']].map(([label, href]) => <Link href={href} key={label} onClick={close}>{label}</Link>)}</div>}
      </div>
    </header>
    {mobileOpen && <nav className="mobile-nav-panel" data-testid="mobile-navigation-menu">{mobileLinks.map(([label, href]) => <Link href={href} key={label} onClick={close} className={pathname === href ? 'active' : ''}>{label}</Link>)}<Link href="/compare" onClick={close}>Compare Displays</Link></nav>}
  </>;
}