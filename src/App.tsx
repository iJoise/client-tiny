import { Viewer } from './lib/types';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './sections/Layout';
import { Home } from './sections/Home';
import { Host } from './sections/Host';
import { Login } from './sections/Login';
import { Listing } from './sections/Listing';
import { Listings } from './sections/Listings';
import { User } from './sections/User';
import { NotFound } from './sections/NotFound';
import { useMutation } from '@apollo/client';
import { LOG_IN } from './lib/graphql/mutations/LogIn';
import {
  LogIn as LogInData,
  LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};
export const App = () => {
  const [viewer, setViewer] = useState(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },
  });
  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout viewer={viewer} setViewer={setViewer} error={error} />}
      >
        <Route index element={<Home />} />
        <Route path="host" element={<Host />} />
        <Route path="login" element={<Login setViewer={setViewer} />} />
        <Route path="listing/:id" element={<Listing />} />
        <Route path="listings/" element={<Listings />} />
        <Route path="listings/:location" element={<Listings />} />
        <Route path="user/:id" element={<User viewer={viewer} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
