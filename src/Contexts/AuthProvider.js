import React, { useEffect, useState } from 'react'
import  { auth, db } from '../Core/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where, limit, QuerySnapshot } from 'firebase/firestore'

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("")

  const getUserName = async (user) => {
    if (user) {
      try {
        console.log(`Firestore: Query to user collection on ${user.uid}`);
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        
        if( querySnapshot.empty ) {
          setUserName("")
        }
        else {
          const data = querySnapshot.docs[0].data();
          setUserName(data.name)
        }
  
      }
      catch (err) {
        console.log(err);
        alert(err.message);
        setUserName("");
      }
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && console.log(`Firebase: Auth state changed, current user is ${user.uid}`);

      if (user && !currentUser) {
        setCurrentUser(user)
        getUserName(user)
      }  

      if (user && currentUser && user?.uid !== currentUser?.uid) {
        setCurrentUser(user)
        getUserName(user)
      }
      
      if (!user) {
        setCurrentUser(null)
        setUserName("")
      } 
    })
  }, [currentUser])

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        userName
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
