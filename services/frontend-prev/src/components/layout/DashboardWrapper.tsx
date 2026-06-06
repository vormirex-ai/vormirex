// src/components/layout/DashboardWrapper.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardWrapper: React.FC = () => {
  return (
    <>
      <Outlet /> {/* Directly renders DashboardPage with its own sidebars */}
    </>
  );
};

export default DashboardWrapper;
