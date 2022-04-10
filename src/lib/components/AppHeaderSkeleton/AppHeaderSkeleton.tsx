import React from "react";
import logo from '../../../assets/logo/tinyhouse-logo.png';
import { Layout } from 'antd';

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
   return (
     <Header className="app-header">
        <div className="app-header__logo-search-section">
           <div className="app-header__logo">
                 <img src={logo} alt="App Logo" />
           </div>
        </div>
     </Header>
   );
};
