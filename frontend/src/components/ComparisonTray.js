import React, { useEffect, useState } from 'react';
import { GitCompareArrows, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clearComparedCodes, getComparedCodes } from '../lib/comparison';

export const ComparisonTray = () => {
  const [codes, setCodes] = useState([]);
  useEffect(() => { const sync = () => setCodes(getComparedCodes()); sync(); window.addEventListener('brightluxx-compare-change', sync); return () => window.removeEventListener('brightluxx-compare-change', sync); }, []);
  if (!codes.length) return null;
  return <aside className="fixed bottom-40 right-4 z-[80] border border-cyan-300/30 bg-[#090a0e] p-3 shadow-2xl md:bottom-6" data-testid="comparison-tray"><div className="flex items-center gap-3"><GitCompareArrows size={16} className="text-cyan-300" /><span className="text-xs font-bold text-white">COMPARE {codes.length}/3</span><Link to="/compare" className="text-xs font-bold text-cyan-300" data-testid="comparison-tray-view">View</Link><button type="button" onClick={() => { clearComparedCodes(); setCodes([]); }} aria-label="Clear comparison" data-testid="comparison-tray-clear"><X size={15} className="text-white/70" /></button></div></aside>;
};