import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = localStorage.getItem('AccessToken');
  
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;