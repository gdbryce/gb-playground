import React, { useEffect, useState, useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button, Divider, Stack, Typography } from '@mui/material'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth, db, logout } from '../../Core/Firebase';

import { AuthContext } from '../../Contexts/AuthProvider';

import Bar from '../Layout/Bar';
import BlogContainer from '../Blog/BlogContainer';
import BlogEntry from '../Blog/BlogEntry';

const initialNewBlog = {
  visible: false,
  addImage: false,
  addText: false,
  addEvent: false,
  image: null,
  blogTitle: "",
  blogText: ""
}

const newBlogReducer = ( state, { type, payload } ) => {
  switch (type) {
    case "TOGGLE_VISIBLE":
      return {
        ...state,
        visible: payload.newValue
      }
    default: 
      return state
  }
}

const Home = () => {
  // const [ user, loading, error ] = useAuthState(auth);
  // const [ name, setName ] = useState("");

  const { currentUser } = useContext(AuthContext);

  const [ newBlog, dispatch ] = useReducer(newBlogReducer, initialNewBlog)
  const navigate = useNavigate();

  // const fetchUserName = async () => {
  //   try {
  //     console.log("Firestore: Query to user");
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     alert(err.message);
  //   }
  // };

  const handleToggleNewBlog = () => {
    dispatch({
      type: "TOGGLE_VISIBLE",
      payload: {
        newValue: !newBlog.visible
      }
    })
  }

  useEffect(() => {
    !currentUser && navigate("/", { replace: true} )
  }, [currentUser])

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [ user, loading ])

  return (
    <>
    <Bar toggleNewBlog={handleToggleNewBlog}/>
    <Divider />

    {newBlog.visible && <BlogEntry />}
    {/* <Divider /> */}
    
    <BlogContainer />
    </>
  )
};

export default Home;
