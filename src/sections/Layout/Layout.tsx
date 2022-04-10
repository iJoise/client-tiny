import React from 'react';
import { Affix, Layout as LayoutAnt } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../AppHeader';
import { Viewer } from '../../lib/types';

interface LayoutProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Layout = ({ viewer, setViewer }: LayoutProps) => {
  return (
    <LayoutAnt id="app">
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer}/>
      </Affix>
      <Outlet />
    </LayoutAnt>
  );
};
