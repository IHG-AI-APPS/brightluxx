import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import MobileDrawer from './MobileDrawer';
import Breadcrumbs from './Breadcrumbs';

const PublicLayout = ({ children, hideFooter = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Navbar />
      {!isHome && <Breadcrumbs />}
      <main>
        {children}
      </main>
      {!hideFooter && <Footer />}
      <MobileBottomNav onMenuClick={handleMenuClick} />
      <MobileDrawer isOpen={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default PublicLayout;
