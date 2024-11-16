// src/apollo/apolloClient.tsx

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create the Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_URL || 'http://localhost:3000/graphql', // Use VITE_ prefix
  }),
  cache: new InMemoryCache(),
});

// Export client as named export
export { client };
