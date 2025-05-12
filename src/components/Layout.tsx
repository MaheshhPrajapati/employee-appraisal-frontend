import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <Layout />

      {/* Page Content */}
      <div className="content">
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
  );
};

export default Layout;
