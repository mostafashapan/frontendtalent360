// src/apollo/apolloClient.tsx

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create the Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
<<<<<<< HEAD
    uri: import.meta.env.VITE_GRAPHQL_API_URL || 'https://backendtalent360-production.up.railway.app/graphql', // Use VITE_ prefix
=======
    uri: import.meta.env.VITE_GRAPHQL_API_URL || 'http://localhost:3000/graphql', // Use VITE_ prefix
>>>>>>> 76a446309f786f1a8c057a62ac3701e98d8e7bed
  }),
  cache: new InMemoryCache(),
});

// Export client as named export
export { client };
