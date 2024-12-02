// src/apollo/apolloClient.tsx

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create the Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_URL || 'https://backendtalent360-production.up.railway.app/graphql', // Use VITE_ prefix
  }),
  cache: new InMemoryCache(),
});

// Export client as named export
export { client };
