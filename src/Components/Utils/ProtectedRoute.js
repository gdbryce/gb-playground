import React from 'react'
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ component, isAuthenticated, ...rest }) {
  return (
    <Route 
      {...rest}
      // render={(props) => { 
      //   isAuthenticated ? <Component /> : <Navigate to={{ pathname: "/", state: { from: props.location } }} />
      // }}
      element={isAuthenticated ? component : <Navigate to="/" />}
    />  
  )
}

export default ProtectedRoute
