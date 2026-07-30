import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import DropdownWrap from './DropdownWrap';

export default function FamilyDropdown({ family, isOpen, setOpen, closeAll, isDark, panelStyle, isActivePrefix }) {
  return (
    <DropdownWrap
      isOpen={isOpen}
      setOpen={setOpen}
      testId={`nav-${family.key}-dropdown`}
      trigger={
        <Link
          to={family.path}
          className={`flex items-center gap-1 text-[0.6875rem] font-bold tracking-[0.12em] uppercase relative pb-0.5 transition-colors duration-200 ${
            isActivePrefix(family.path) ? family.colorClass : `${family.colorClass}/60 hover:${family.colorClass}`
          }`}
          style={{ color: isActivePrefix(family.path) ? undefined : undefined }}
          data-testid={`nav-${family.key}`}
        >
          {family.name}
          <ChevronDown size={10} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          {isActivePrefix(family.path) && <span className={`absolute bottom-0 left-0 right-0 h-px bg-current`} />}
        </Link>
      }
    >
      <div className="shadow-2xl py-2 px-1 min-w-[220px] max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, borderColor: family.panelBorder }}>
        <Link to={family.path} onClick={closeAll} className={`block px-3 py-2 rounded-lg text-[0.65rem] font-semibold ${family.colorClass} ${isDark ? family.hoverBg : family.hoverBgLight} transition-colors`}>
          Overview
        </Link>
        {family.items.map((item) => (
          <Link key={item.path} to={item.path} onClick={closeAll} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isDark ? family.hoverBg : family.hoverBgLight}`}>
            <div className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border ${family.borderColor}`}>
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`block text-[0.65rem] font-medium ${isDark ? 'text-white' : 'text-neutral-800'}`}>{item.name}</span>
              <span className={`block text-[0.55rem] ${isDark ? 'text-neutral-500' : 'text-neutral-400'} truncate`}>{item.desc}</span>
            </div>
          </Link>
        ))}
      </div>
    </DropdownWrap>
  );
}
