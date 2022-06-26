import React, { useEffect, useState, useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material'
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
  const { currentUser, userName } = useContext(AuthContext);
  const [newBlog, dispatch] = useReducer(newBlogReducer, initialNewBlog)

  const [pageNumber, setPageNumber] = useState(1)
  const { blogs, lastBlog, hasMore, getFirstResults, getNextResults } = useFireblog(pageNumber, newBlog.uploadingImage)

  const navigate = useNavigate();

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
    dispatch({
      type: "UPDATE_AUTHOR",
      payload: {
        userName
      }
    })
  }, [userName, newBlog.author])

  useEffect(() => {
    if (hasMore) pageNumber === 1 ? getFirstResults() : getNextResults()
  },[pageNumber, hasMore])

  useEffect(() => {
    if (newBlog.submitting) setPageNumber(1)
  }, [newBlog.submitting])

  return (
    <>
    <Bar toggleNewBlog={handleToggleNewBlog}/>
    <Divider />

    {newBlog.visible && <BlogEntry newBlogState={newBlog} newBlogDispatch={dispatch}/>}
    
    {blogs && <BlogContainer 
      blogs={blogs} 
      lastBlog={lastBlog} 
      hasMore={hasMore}
      uploadingImage={newBlog.uploadingImage}
      setPageNumber={setPageNumber}
    />}
    </>
  )
};

export default Home;
