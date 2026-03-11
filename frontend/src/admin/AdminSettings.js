import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import { Lock, Shield, Key, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const { api, admin } = useAdmin();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPw.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    if (newPw !== confirmPw) {
      setError('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      await api().post('/api/admin/change-password', {
        current_password: currentPw,
        new_password: newPw,
      });
      setSuccess('Password changed successfully');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8" data-testid="admin-settings-page">
      <div>
        <h1 className="text-lg font-bold tracking-wider">Settings</h1>
        <p className="text-xs text-[var(--blx-muted)] tracking-wider mt-1">Security and account settings</p>
      </div>

      {/* Account Info */}
      <div className="glass-panel p-6">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4 flex items-center gap-2"><Shield size={14} /> Account</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-[var(--blx-border)]">
            <span className="text-xs text-[var(--blx-muted)] tracking-wider">Email</span>
            <span className="text-xs font-bold tracking-wider">{admin?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[var(--blx-border)]">
            <span className="text-xs text-[var(--blx-muted)] tracking-wider">Role</span>
            <span className="text-xs font-bold tracking-wider capitalize">{admin?.role?.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-[var(--blx-muted)] tracking-wider">Token Expiry</span>
            <span className="text-xs text-[var(--blx-text-2)] tracking-wider">4 hours (auto-refresh)</span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="glass-panel p-6 max-w-lg">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4 flex items-center gap-2"><Key size={14} /> Change Password</h3>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg text-xs tracking-wider mb-4" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', }} data-testid="settings-password-error">
            <AlertCircle size={14} /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 p-3 rounded-lg text-xs tracking-wider mb-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', }} data-testid="settings-password-success">
            <CheckCircle2 size={14} /> {success}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Current Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)}
                required className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200"
                data-testid="settings-current-password"
              />
            </div>
          </div>
          <div>
            <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">New Password</label>
            <div className="relative">
              <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
                required minLength={8} className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200"
                data-testid="settings-new-password"
              />
            </div>
            <p className="text-[0.5rem] text-[var(--blx-muted)] mt-1 tracking-wider">Minimum 8 characters</p>
          </div>
          <div>
            <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Confirm New Password</label>
            <div className="relative">
              <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
              <input
                type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                required className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200"
                data-testid="settings-confirm-password"
              />
            </div>
          </div>
          <button
            type="submit" disabled={saving}
            className="btn-gold px-6 py-2.5 text-xs flex items-center gap-2 disabled:opacity-50"
            data-testid="settings-change-password-submit"
          >
            <Save size={14} /> {saving ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>

      {/* Security Info */}
      <div className="glass-panel p-6">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4 flex items-center gap-2"><Shield size={14} /> Security Features</h3>
        <ul className="space-y-2 text-xs text-[var(--blx-text-2)] tracking-wider">
          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" /> Rate limiting: 5 login attempts per minute per IP</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" /> JWT tokens with 4-hour expiry + 7-day refresh</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" /> Bcrypt password hashing (12 rounds)</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" /> Security headers: X-Frame-Options, XSS Protection, nosniff</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" /> Image uploads: type validation, 10MB limit, auto-optimization</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" /> Contact form rate limited: 10 submissions per minute</li>
        </ul>
      </div>
    </div>
  );
}
