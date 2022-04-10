import React, { useEffect, useRef } from 'react';
import { Card, Layout, Typography, Spin } from 'antd';
import googleLogo from './assets/google_logo.jpg';
import { Viewer } from '../../lib/types';
import { useApolloClient, useMutation } from '@apollo/client';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/query/AuthUrl/__generated__/AuthUrl';
import { AUTH_URL } from '../../lib/graphql/query/AuthUrl';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { LOG_IN } from '../../lib/graphql/mutations/LogIn';
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../lib/components/utils';
import { ErrorBanner } from '../../lib/components';
import { Navigate } from 'react-router-dom';

const { Content } = Layout;
const { Text, Title } = Typography;

interface LoginProps {
  setViewer: (viewer: Viewer) => void;
}

const errorDescription = "Sorry! We weren't able to log you in. Please try again latter!";

export const Login = ({ setViewer }: LoginProps) => {
  const client = useApolloClient();
  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] =
    useMutation<LogInData, LogInVariables>(LOG_IN, {
      onCompleted: data => {
        if (data && data.logIn && data.logIn.token) {
          setViewer(data.logIn);
          sessionStorage.setItem('token', data.logIn.token);
          displaySuccessNotification("You've successfully logged in");
        }
      },
    });
  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch (err) {
      displayErrorMessage(errorDescription);
    }
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Loading you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Navigate to={`/user/${viewerId}`} replace />;
  }

  const loginBannerElement = logInError ? (
    <ErrorBanner description={errorDescription} />
  ) : null;

  return (
    <Content className="log-in">
      {loginBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to TinyHouse
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button className="log-in-card__google-button" onClick={handleAuthorize}>
          <img
            src={googleLogo}
            alt="Google logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">Sign in with Google</span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent from to sign in
          with your Google account.
        </Text>
      </Card>
    </Content>
  );
};
