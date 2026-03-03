import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

const StickyCTA = () => {
  const whatsappNumber = '971559910711'; // UAE format without +
  const whatsappMessage = 'Hi, I\'m interested in Brightluxx LED displays';

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
        className="btn-glass flex items-center gap-2 px-6 py-3"
        data-testid="whatsapp-button"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </button>
      <a
        href="/contact"
        className="btn-gold flex items-center gap-2 px-6 py-3"
        data-testid="book-demo-button"
      >
        <PhoneCall size={20} />
        <span>Book Demo</span>
      </a>
    </div>
  );
};

export default StickyCTA;