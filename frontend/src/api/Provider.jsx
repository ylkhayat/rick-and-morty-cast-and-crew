import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const Provider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Provider;
