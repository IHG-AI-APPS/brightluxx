import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import MobileDrawer from './MobileDrawer';

const PublicLayout = ({ children, hideFooter = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Navbar />
      {children}
      {!hideFooter && <Footer />}
      <MobileBottomNav onMenuClick={handleMenuClick} />
      <MobileDrawer isOpen={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default PublicLayout;
