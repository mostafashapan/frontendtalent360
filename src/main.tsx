import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/globals.css'; // Global styles
import { ApolloProvider } from '@apollo/client';
import {  client} from './apollo/apolloClient';
import Dashboard from './pages/Dashboard';
import Calendar from './modules/Calender/Calendar';
import Employees from './pages/Employees';
import ErrorPage from './pages/ErrorPage';

import App from './App'; // Import the root layout component
import HREmployess from './content/hremployess';
import HRManager from './pages/HRManager';
import About from './pages/About';

// Create the router configuration



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App /> // App layout, dynamically rendering the correct page
    ),
    children: [
      {
        path: "/",
        element: <HREmployess/> // Dashboard page when the user is on the home route
      },
      {
        path: "/calender",
       
        element: <Calendar/> // HRManager page
      },  {
        path: "/Pie-Chart",
       
        element: <HRManager/> // HRManager page
      },
      {
        path: "/document",
       
        element: <Dashboard /> // HRManager page
      },
      {
        path: "/about",
       
        element:<About /> // HRManager page
      },

      
      {
        path: "/employees",
        element: (
          <Employees 
            activeTab="personal" 
            setActiveTab={() => console.log('Tab changed!')} 
          /> // Employees page with dynamic tab handling
        )
      },
    ],
  },
  {
    path: "/error",
    element: <ErrorPage />, // Error page route
  },
]);

// Main app rendering
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* Wrap everything in ApolloProvider to provide Apollo Client */}
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
