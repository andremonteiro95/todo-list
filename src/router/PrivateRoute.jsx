import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsAuthenticated } from '../redux/selectors';

function PrivateRoute(props) {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}

export default PrivateRoute;
