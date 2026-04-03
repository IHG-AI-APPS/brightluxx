import React, { createContext, useContext, useState, useEffect } from 'react';

const API = process.env.REACT_APP_BACKEND_URL;

const DEFAULTS = {
  branding: { logo_url: '/assets/brightluxx-logo-dark.png', favicon_url: '/favicon.ico', company_name: 'Brightluxx', tagline: 'Premium LED Display Solutions', established_year: '2005' },
  contact: { phone: '+971 4 258 5754', email: 'sales@brightluxx.com', whatsapp: '+971559954274', address: 'Jebel Ali Industrial Area 1, Dubai, UAE' },
  social: { instagram: 'https://www.instagram.com/brightluxx/', facebook: 'https://www.facebook.com/brightluxx/', linkedin: 'https://www.linkedin.com/company/brightluxx/', youtube: 'https://www.youtube.com/@brightluxx', twitter: '', tiktok: '' },
  embeds: { google_map: '' },
  seo: { meta_title: 'Brightluxx — Premium LED Display Solutions', meta_description: '', og_image: '' },
};

const SiteSettingsContext = createContext(DEFAULTS);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/api/site-settings`)
      .then(r => r.json())
      .then(data => {
        setSettings(prev => ({
          branding: { ...prev.branding, ...data.branding },
          contact: { ...prev.contact, ...data.contact },
          social: { ...prev.social, ...data.social },
          embeds: { ...prev.embeds, ...data.embeds },
          seo: { ...prev.seo, ...data.seo },
        }));
        // Update favicon dynamically
        if (data.branding?.favicon_url) {
          const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
          link.rel = 'icon';
          link.href = data.branding.favicon_url;
          document.head.appendChild(link);
        }
        // Update OG image from site settings (for crawlers that re-read after JS)
        if (data.seo?.og_image) {
          const ogImg = document.querySelector('meta[property="og:image"]');
          if (ogImg) ogImg.setAttribute('content', data.seo.og_image);
          const twImg = document.querySelector('meta[name="twitter:image"]');
          if (twImg) twImg.setAttribute('content', data.seo.og_image);
        }
        // Update OG title/description
        if (data.seo?.meta_title) {
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) ogTitle.setAttribute('content', data.seo.meta_title);
          const twTitle = document.querySelector('meta[name="twitter:title"]');
          if (twTitle) twTitle.setAttribute('content', data.seo.meta_title);
        }
        if (data.seo?.meta_description) {
          const ogDesc = document.querySelector('meta[property="og:description"]');
          if (ogDesc) ogDesc.setAttribute('content', data.seo.meta_description);
          const twDesc = document.querySelector('meta[name="twitter:description"]');
          if (twDesc) twDesc.setAttribute('content', data.seo.meta_description);
        }
      })
      .catch(() => {}); // use defaults on failure
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
