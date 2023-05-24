import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../authContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
