import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsAuthenticated } from '../redux/selectors';

function PublicRoute(props) {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}

export default PublicRoute;
