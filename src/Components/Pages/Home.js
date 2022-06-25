import React, { useEffect, useState, useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button, Divider, Stack, Typography } from '@mui/material'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth, db, logout } from '../../Core/Firebase';
import useFireblog from '../../Hooks/useFireblog'

import { AuthContext } from '../../Contexts/AuthProvider';

import Bar from '../Layout/Bar';
import BlogContainer from '../Blog/BlogContainer';
import BlogEntry from '../Blog/BlogEntry';

const initialNewBlog = {
  visible: false,
  uploadingImage: "",
  submitting: false,
  blogMeta: {
    hasBlogText: false,
    hasBlogImage: false,
    hasBlogEvent: false,
    invoker: "useFireblog.submitBlogToFirestore"
  },
  image: null,
  imageURL: null,
  author: "",
  title: "",
  blogText: "",
  posted: null
}

const newBlogReducer = ( state, { type, payload } ) => {
  switch (type) {
    case "TOGGLE_VISIBLE":
      return {
        ...state,
        visible: payload.newValue
      }
    case "SUBMITTING":
      return {
        ...state,
        submitting: true
      }
    case "UPDATE_UPLOADING_IMAGE":
      return {
        ...state,
        uploadingImage: payload.uploadingImage
      }
    case "UPDATE_AUTHOR":
      return {
        ...state,
        author: payload.userName
      }
    case "UPDATE_BLOG_META" :
      return {
        ...state,
        blogMeta: payload.blogMeta
      }
    case "UPDATE_BLOG_TITLE":
      return {
        ...state,
        title: payload.title
      }
    case "UPDATE_BLOG_TEXT":
      return {
        ...state,
        blogText: payload.blogText
      }
    case "UPDATE_BLOG_IMAGE":
      return {
        ...state,
        image: payload.image,
        imageURL: payload.imageURL
      }
    case "RESET_NEW_BLOG":
      return {
        initialNewBlog
      }
    default: 
      return state
  }
}

const Home = () => {
  // const [ user, loading, error ] = useAuthState(auth);
  // const [ name, setName ] = useState("");

  const { currentUser, userName } = useContext(AuthContext);

  const [newBlog, dispatch] = useReducer(newBlogReducer, initialNewBlog)

  // const [refreshBlogs, setRefreshBlogs] = useState(false)
  // const [pageNumber, setPageNumber] = useState(1)

  const [blogControl, setBlogControl] = useState({refresh: false, pageNumber: 1})
  const { blogs, lastBlog } = useFireblog(blogControl, newBlog.uploadingImage)

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

  useEffect(() => {
    userName && dispatch({
      type: "UPDATE_AUTHOR",
      payload: {
        userName
      }
    })
  }, [userName])

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [ user, loading ])

  return (
    <>
    <Bar toggleNewBlog={handleToggleNewBlog}/>
    <Divider />

    {newBlog.visible && <BlogEntry newBlogState={newBlog} newBlogDispatch={dispatch} triggerRefresh={setBlogControl}/>}
    {/* <Divider /> */}
    
    <BlogContainer blogs={blogs} uploadingImage={newBlog.uploadingImage}/>
    </>
  )
};

export default Home;
