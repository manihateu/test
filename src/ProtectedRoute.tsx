import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './app/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.accessToken);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
