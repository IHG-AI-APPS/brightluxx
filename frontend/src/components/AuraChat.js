import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL;
const AURA_AVATAR = 'https://files.ihgbrands.com/emergent-images/4de29b1557ed773232c26af312b994e1ed537e4dc5bd99c8787717c897722209.png';

const QUICK_ACTIONS = [
  { label: 'Choose Pixel Pitch', msg: 'Help me choose the right pixel pitch for my project' },
  { label: 'Estimate Budget', msg: 'I need a budget estimate for an LED display project' },
  { label: 'Best Tech for Retail', msg: 'What LED technology is best for a retail environment?' },
  { label: 'Book Consultation', msg: 'I would like to book a free Design Assist consultation' },
];

function getSessionId() {
  let id = sessionStorage.getItem('aura_session');
  if (!id) {
    id = 'aura_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem('aura_session', id);
  }
  return id;
}

export default function AuraChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello, I'm **AURA** — your LED display specification assistant. I can help you choose the right technology, pixel pitch, and brightness for your project.\n\nWhat are you working on?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', role: '' });
  const [leadError, setLeadError] = useState('');
  const [pulse, setPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(getSessionId());
  const location = useLocation();
  const navigate = useNavigate();

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in Brightluxx LED displays";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showLeadForm]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (open) setPulse(false);
  }, [open]);

  const sendMessage = async (text) => {
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId.current,
          message: text,
          page_url: location.pathname,
        }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        if (data.show_lead_form && !leadCaptured) setShowLeadForm(true);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or contact us directly." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendMessage(input.trim());

  const handleQuickAction = (msg) => sendMessage(msg);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.company) {
      setLeadError('Please fill in all fields.');
      return;
    }
    try {
      await fetch(`${API}/api/chat/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId.current, ...leadForm }),
      });
      setLeadCaptured(true);
      setShowLeadForm(false);
    } catch {
      setLeadError('Error saving. Please try again.');
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleLinkClick = (e) => {
    const link = e.target.closest('a[data-internal]');
    if (link) {
      e.preventDefault();
      const path = link.getAttribute('href');
      if (path) {
        setOpen(false);
        navigate(path);
      }
    }
  };

  const renderMarkdown = (text) => {
    return text
      // Convert markdown links [text](/path) to clickable internal links
      .replace(/\[([^\]]+)\]\((\/([\w\-\/]+))\)/g,
        '<a href="$2" data-internal="true" style="color:#E5C574;text-decoration:underline;text-decoration-color:rgba(229,197,116,0.3);cursor:pointer;font-weight:600;">$1</a>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br/>');
  };

  const showQuickActions = messages.length <= 1 && !loading;

  return (
    <>
      {/* Floating Buttons — Desktop only */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-center gap-4">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
            data-testid="floating-whatsapp-button"
            aria-label="Contact on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
          <button
            onClick={() => setOpen(true)}
            className="group relative"
            data-testid="aura-chat-button"
            aria-label="Open AURA chat"
          >
            <div className="relative">
              <img src={AURA_AVATAR} alt="AURA" className="w-14 h-14 rounded-full object-cover" style={{ border: '2px solid rgba(229,197,116,0.4)', boxShadow: '0 0 20px rgba(229,197,116,0.2)' }} />
              {pulse && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--blx-gold-3)] animate-ping" />}
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--blx-gold-3)]" />
            </div>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg text-[0.5625rem] font-bold tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(11,11,11,0.9)', border: '1px solid rgba(229,197,116,0.2)' }}>
              Ask AURA
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col"
          style={{
            height: '560px',
            maxHeight: 'calc(100vh - 6rem)',
            background: '#0B0B0B',
            border: '1px solid rgba(229,197,116,0.15)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(229,197,116,0.05)',
          }}
          data-testid="aura-chat-window"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <img src={AURA_AVATAR} alt="AURA" className="w-8 h-8 rounded-full object-cover" style={{ border: '1.5px solid rgba(229,197,116,0.3)' }} />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-[0.12em]" style={{ fontFamily: 'var(--blx-font)' }}>AURA</div>
              <div className="text-[0.5rem] tracking-[0.15em] text-[var(--blx-gold-3)]">LED SPECIFICATION ASSISTANT</div>
            </div>
            <div className="flex items-center gap-1 mr-2">
              <Sparkles size={10} className="text-[var(--blx-gold-3)]" />
              <span className="text-[0.45rem] tracking-wider text-[var(--blx-gold-3)]">GPT-5.2</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors" data-testid="aura-close-button">
              <X size={16} className="text-[var(--blx-muted)]" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ scrollBehavior: 'smooth' }}
            data-testid="aura-messages"
            onClick={handleLinkClick}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <img src={AURA_AVATAR} alt="AURA" className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0" style={{ border: '1px solid rgba(229,197,116,0.2)' }} />
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[0.75rem] leading-relaxed ${msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}`}
                  style={{
                    background: msg.role === 'user' ? 'rgba(229,197,116,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(229,197,116,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    fontFamily: 'var(--blx-font)',
                    textTransform: 'none',
                  }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  data-testid={`aura-msg-${i}`}
                />
              </div>
            ))}

            {/* Quick Action Chips */}
            {showQuickActions && (
              <div className="flex flex-wrap gap-2 pt-1" data-testid="aura-quick-actions">
                {QUICK_ACTIONS.map((qa, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(qa.msg)}
                    className="px-3 py-1.5 rounded-full text-[0.625rem] font-semibold tracking-wider transition-all hover:scale-105"
                    style={{
                      background: 'rgba(229,197,116,0.08)',
                      border: '1px solid rgba(229,197,116,0.2)',
                      color: '#E5C574',
                      textTransform: 'none',
                    }}
                    data-testid={`aura-quick-action-${i}`}
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <img src={AURA_AVATAR} alt="AURA" className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0" style={{ border: '1px solid rgba(229,197,116,0.2)' }} />
                <div className="px-4 py-3 rounded-2xl rounded-bl-md" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--blx-gold-3)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--blx-gold-3)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--blx-gold-3)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Lead Capture Form */}
            {showLeadForm && !leadCaptured && (
              <div className="mx-auto w-full p-4 rounded-xl" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.15)' }} data-testid="aura-lead-form">
                <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-2">ENJOYING THE CONVERSATION?</div>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] mb-3" style={{ textTransform: 'none' }}>
                  Share your details and I can provide more specific recommendations for your project.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <input type="text" placeholder="Name *" value={leadForm.name} onChange={e => setLeadForm(p => ({...p, name: e.target.value}))} className="w-full text-xs py-2" data-testid="aura-lead-name" />
                  <input type="email" placeholder="Work email *" value={leadForm.email} onChange={e => setLeadForm(p => ({...p, email: e.target.value}))} className="w-full text-xs py-2" data-testid="aura-lead-email" />
                  <input type="text" placeholder="Company *" value={leadForm.company} onChange={e => setLeadForm(p => ({...p, company: e.target.value}))} className="w-full text-xs py-2" data-testid="aura-lead-company" />
                  {leadError && <p className="text-red-400 text-[0.625rem]">{leadError}</p>}
                  <div className="flex gap-2">
                    <button type="submit" className="btn-gold flex-1 px-3 py-2 text-[0.625rem] font-bold tracking-[0.12em]" data-testid="aura-lead-submit">Save & Continue</button>
                    <button type="button" onClick={() => setShowLeadForm(false)} className="btn-glass px-3 py-2 text-[0.625rem] font-bold tracking-[0.12em]" data-testid="aura-lead-skip">Skip</button>
                  </div>
                </form>
              </div>
            )}

            {leadCaptured && <div className="sr-only" data-testid="aura-lead-captured" />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <form
              onSubmit={e => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about LED displays..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--blx-text)]"
                style={{ fontFamily: 'var(--blx-font)', textTransform: 'none' }}
                disabled={loading}
                data-testid="aura-input"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`p-1.5 rounded-lg transition-colors ${input.trim() ? 'text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.1)]' : 'text-[var(--blx-muted)]'}`}
                data-testid="aura-send-button"
              >
                <Send size={14} />
              </button>
            </form>
            <div className="text-center mt-1.5">
              <span className="text-[0.45rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>AURA by Brightluxx — AI-powered by GPT-5.2</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
