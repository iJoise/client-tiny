import React from 'react';
import { Affix, Layout as LayoutAnt, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../AppHeader';
import { Viewer } from '../../lib/types';
import { ApolloError } from '@apollo/client';
import { AppHeaderSkeleton, ErrorBanner } from '../../lib/components';

interface LayoutProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
  error: ApolloError | undefined;
}

export const Layout = ({ viewer, setViewer, error }: LayoutProps) => {
  if (!viewer.didRequest && !error) {
    return (
      <LayoutAnt className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching TinyHouse" />
        </div>
      </LayoutAnt>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later" />
  ) : null;

  return (
    <LayoutAnt id="app">
      {logInErrorBannerElement}
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
      <Outlet />
    </LayoutAnt>
  );
};
