import React from 'react';
import { Layout as LayoutAnt } from 'antd';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <LayoutAnt id="app">
      <Outlet />
    </LayoutAnt>
  );
};
