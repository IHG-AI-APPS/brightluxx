import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

const StickyCTA = () => {
  const whatsappNumber = '971559910711';
  const whatsappMessage = "Hi, I'm interested in Brightluxx LED displays";

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <div className="sticky-cta-bar" data-testid="sticky-cta-bar">
      <button
        onClick={handleWhatsApp}
        className="btn-glass flex items-center gap-2 px-5 py-2.5 text-sm"
        data-testid="whatsapp-quick-contact-button"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </button>
      <a
        href="/contact"
        className="btn-gold flex items-center gap-2 px-5 py-2.5 text-sm"
        data-testid="book-demo-button"
      >
        <PhoneCall size={18} />
        <span>Get Quote</span>
      </a>
    </div>
  );
};

export default StickyCTA;
