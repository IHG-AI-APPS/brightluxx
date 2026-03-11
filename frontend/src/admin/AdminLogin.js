import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-4" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.15), rgba(229,197,116,0.05))', border: '1px solid rgba(229,197,116,0.2)' }}>
            <Lock size={28} className="text-[var(--blx-gold-3)]" />
          </div>
          <h1 className="text-xl font-bold tracking-wider mb-1">Admin Panel</h1>
          <p className="text-xs text-[var(--blx-muted)] tracking-widest">Brightluxx Content Management</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg text-xs tracking-wider" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171' }} data-testid="admin-login-error">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div>
            <label className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2 block">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@brightluxx.com" required
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-sm tracking-wider text-[var(--blx-text)] pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200"
                data-testid="admin-login-email"
              />
            </div>
          </div>

          <div>
            <label className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2 block">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" required
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-sm tracking-wider text-[var(--blx-text)] pl-10 pr-11 py-3 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200"
                data-testid="admin-login-password"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--blx-muted)] hover:text-[var(--blx-text)] transition-colors duration-200">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full py-3.5" data-testid="admin-login-submit">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
