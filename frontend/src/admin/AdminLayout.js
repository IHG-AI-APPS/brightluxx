import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { LayoutDashboard, Package, Sparkles, FolderKanban, Users, LogOut, Download, Upload, ChevronLeft, Settings, BarChart3, Activity } from 'lucide-react';

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/inspirations', icon: Sparkles, label: 'Inspirations' },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/leads', icon: Users, label: 'Leads' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/performance', icon: Activity, label: 'Performance' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin'); };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex" data-testid="admin-layout">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-[var(--blx-border)] flex flex-col" style={{ background: 'rgba(20,20,20,0.95)' }}>
        <div className="p-5 border-b border-[var(--blx-border)]">
          <div className="text-sm font-bold tracking-wider">Brightluxx</div>
          <div className="text-[0.5625rem] text-[var(--blx-gold-3)] tracking-[0.2em] mt-0.5">CMS Admin</div>
        </div>

        <nav className="flex-1 p-3 space-y-1" data-testid="admin-sidebar-nav">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to} to={to}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider transition-colors duration-200 ${isActive ? 'bg-[rgba(229,197,116,0.08)] text-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)]'}`}
              data-testid={`admin-nav-${label.toLowerCase()}`}
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--blx-border)] space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors duration-200">
            <ChevronLeft size={16} /> View Site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider text-[var(--blx-text-2)] hover:bg-[rgba(220,38,38,0.08)] hover:text-red-400 transition-colors duration-200 w-full text-left" data-testid="admin-logout-button">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="p-4 border-t border-[var(--blx-border)]">
          <div className="text-[0.625rem] font-bold tracking-wider truncate">{admin?.name || 'Admin'}</div>
          <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider truncate">{admin?.email}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
