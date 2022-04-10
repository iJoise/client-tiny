import React from 'react';
import logo from './assets/tinyhouse-logo.png';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { MenuItems } from './components/MenuItems';
import { Viewer } from '../../lib/types';

interface AppHeaderProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: AppHeaderProps) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to={'/'}>
            <img src={logo} alt="App Logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer}/>
      </div>
    </Header>
  );
};
