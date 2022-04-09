import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Listings } from './sections/Listings';
import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './sections/Home';
import { Host } from './sections/Host';
import { Listing } from './sections/Listing';
import { User } from './sections/User';
import { NotFound } from './sections/NotFound';
import { Layout } from './sections/Layout';
import { Login } from './sections/Login';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="host" element={<Host />} />
        <Route path="login" element={<Login />} />
        <Route path="listing/:id" element={<Listing />} />
        <Route path="listings/" element={<Listings title="TinyHouse" />} />
        <Route path="listings/:location" element={<Listings title="TinyHouse" />} />
        <Route path="user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
