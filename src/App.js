import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Landing from './Components/Landing/Landing';
import Home from './Components/Pages/Home';

import { AuthContext } from './Contexts/AuthProvider'
import { Guard } from './Components/Utils/Guard';

import { firebaseObserver, getUserName } from './Core/Firebase'
import { useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const { authenticated, authenticatedUser, userName, refreshContext } = useContext(AuthContext)

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', (loggedIn)=> {
      console.log ("App: useEffect for subscribing to FirebaseObserver, loggedIn = ", loggedIn)
      
      refreshContext()
    });

    return() => { firebaseObserver.unsubscribe('authStateChanged'); }
  }, [])

  return (
    <>{
      isLoading ? 
      <div>Loading ...</div>
      :
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={authenticated ? <Navigate to='/Home' /> : <Navigate to='/Landing' />} />

            <Route element={<Guard isAuthenticated={authenticated} routeRedirect="/Landing" />}>
              <Route path="/Home" element={<Home />} />
            </Route>
            <Route element={<Guard isAuthenticated={!authenticated} routeRedirect="/Home" />}>
              <Route exact path="/Landing" element={<Landing />} />
            </Route>

            {/* Catch-all for any other route to direct to either landing or  */}
            <Route path='*' element={authenticated ? <Navigate to='/Home' /> : <Navigate to='/Landing' />} />
          </Routes>
        </Router>
        
      </div>
    }</>
  );
}

export default App;
