import React, { useEffect, useState } from 'react'
import  { auth, db, loggedIn, getUserName } from '../Core/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { firebaseObserver } from '../Core/Firebase';

const AuthContext = React.createContext();


const AuthProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [userName, setUserName] = useState("")

  const [authenticated, setAuthenticated] = useState(loggedIn())
  // const [isLoading, setIsLoading] = useState(true)
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

  // useEffect(() => {
  //   console.log("AuthProvider: UseEffect")
  //   console.log("AuthProvider: authenticated state =", authenticated)
  //   firebaseObserver.subscribe('authStateChanged', ({ loggedIn }) => {
  //     console.log("AuthProvider: Subscription Callback", loggedIn, auth.currentUser.uid, auth.currentUser.displayName)
  //     setAuthenticated(loggedIn);
  //     setAuthenticatedUser(auth.currentUser);
  //     setUserName(auth.currentUser.displayName);
  //     // setIsLoading(false);
  //   });

  //   return () => { firebaseObserver.unsubscribe('authStateChanged'); }
  // },[])
  
  // const getUserName = async (user) => {
  //   if (user) {
  //     try {
  //       console.log(`Firestore: Query to user collection on ${user.uid}`);
  //       const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //       const querySnapshot = await getDocs(q);
        
  //       if( querySnapshot.empty ) {
  //         setUserName("")
  //       }
  //       else {
  //         const data = querySnapshot.docs[0].data();
  //         setUserName(data.name)
  //       }
  
  //     }
  //     catch (err) {
  //       console.log(err);
  //       alert(err.message);
  //       setUserName("");
  //     }
  //   }
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     user && console.log(`Firebase: Auth state changed, current user is ${user.uid}`);

  //     if (user && !currentUser) {
  //       setCurrentUser(user)
  //       getUserName(user)
  //     }  

  //     if (user && currentUser && user?.uid !== currentUser?.uid) {
  //       setCurrentUser(user)
  //       getUserName(user)
  //     }
      
  //     if (!user) {
  //       setCurrentUser(null)
  //       setUserName("")
  //     } 
  //   })
  // }, [currentUser])

  return (
    <AuthContext.Provider 
      value={{ 
        authenticated,
        authenticatedUser,
        // isLoading, 
        userName,
        refreshContext
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
