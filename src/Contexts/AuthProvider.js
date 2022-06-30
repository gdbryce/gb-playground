import React, { useState } from 'react'
import  { auth, loggedIn, getUserName } from '../Core/Firebase'

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(loggedIn())
  const [authenticatedUser, setAuthenticatedUser] = useState()
  const [userName, setUserName] = useState("")

  const refreshContext = () => {
    if (loggedIn())
    {
      getUserName()
      .then(authUserName => {
        setAuthenticated(loggedIn());
        setAuthenticatedUser(auth.currentUser);
        setUserName(authUserName);
      })
      .catch((err) => {
        console.log("AuthProvider: refreshContext - error from getUserName = ", err)
        setAuthenticated(loggedIn());
        setAuthenticatedUser(auth.currentUser);
        setUserName(null);
      })
    }
    else {
      setAuthenticated(loggedIn());
      setAuthenticatedUser(auth.currentUser);
      setUserName(null);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        authenticated,
        authenticatedUser,
        userName,
        refreshContext
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
