import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Listings } from './sections/Listings';
import './styles/index.css';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Listings title="TinyHouse" />
  </ApolloProvider>,
  document.getElementById('root'),
);
