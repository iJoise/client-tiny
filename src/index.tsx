import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const httpLink = createHttpLink({
  uri: '/api',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token');
  operation.setContext({
    headers: {
      'X-CSRF-TOKEN': token || '',
    },
  });

  return forward(operation);
}).concat(httpLink);

const client = new ApolloClient({
  link: authLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
