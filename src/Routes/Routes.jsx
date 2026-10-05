import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Evolve from '../evolve/Evolve.jsx';

// One page; anything else goes home
const router = createBrowserRouter([
  { path: '/', element: <Evolve /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
