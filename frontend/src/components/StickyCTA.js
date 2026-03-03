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
        className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20BD5A] transition-colors"
        data-testid="whatsapp-button"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </button>
      <a
        href="/contact"
        className="flex items-center gap-2 px-6 py-3 bg-[var(--blx-accent)] text-[var(--blx-bg)] rounded-lg font-medium hover:bg-[var(--blx-accent-2)] transition-colors"
        data-testid="book-demo-button"
      >
        <PhoneCall size={20} />
        <span>Book Demo</span>
      </a>
    </div>
  );
};

export default StickyCTA;