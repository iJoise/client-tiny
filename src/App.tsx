import { Viewer } from './lib/types';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './sections/Layout';
import { Home } from './sections/Home';
import { Host } from './sections/Host';
import { Login } from './sections/Login';
import { Listing } from './sections/Listing';
import { Listings } from './sections/Listings';
import { User } from './sections/User';
import { NotFound } from './sections/NotFound';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};
export const App = () => {
  const [viewer, setViewer] = useState(initialViewer);

  return (
    <Routes>
      <Route path="/" element={<Layout viewer={viewer} setViewer={setViewer} />}>
        <Route index element={<Home />} />
        <Route path="host" element={<Host />} />
        <Route path="login" element={<Login setViewer={setViewer} />} />
        <Route path="listing/:id" element={<Listing />} />
        <Route path="listings/" element={<Listings />} />
        <Route path="listings/:location" element={<Listings />} />
        <Route path="user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
