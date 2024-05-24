import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = window.sessionStorage.getItem('sessionId');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Provider;
