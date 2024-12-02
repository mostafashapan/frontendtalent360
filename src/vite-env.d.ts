/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Declare any custom environment variables you need here
    VITE_GRAPHQL_API_URL: string; // This is the environment variable for your GraphQL API URL
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  