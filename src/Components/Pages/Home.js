import React, { useEffect, useState, useReducer, useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { withRouter } from '../Utils/withRouter';
import { Divider } from '@mui/material'
import { getFireblogResults } from '../../Core/Firebase'
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

const initialBlogs = {
  status: "EMPTY",
  blogs: null,
  lastBlog: null,
  hasMore: false
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

const blogsReducer = ( state, { type, payload } ) => {
  switch (type) {
    case "FETCH":
      return {
        ...state,
        status: "FETCHING"
      }
    case "REQUESTED":
      return {
        ...state,
        status: "WAITING"
      }
    case "BLOGS_RESOLVED":
      return {
        ...state,
        status: "UPDATED",
        blogs: payload.newBlogs,
        lastBlog: payload.newLastBlog,
        hasMore: payload.newHasMore
      }
    default:
      return state
  }
}

const Home = () => {
  console.log("loading Home")
  const { userName } = useContext(AuthContext);
  const [newBlog, dispatch] = useReducer(newBlogReducer, initialNewBlog);
  const [blogs, dispatchBlogs] = useReducer(blogsReducer, initialBlogs);

  // const [blogs, setBlogs] = useState()
  // const [lastBlog, setLastBlog] = useState()
  // const [hasMore, setHasMore] = useState(true)
  // const [isBlogsLoading, setIsBlogsLoading] = useState(false)
  // const { blogs, lastBlog, hasMore, getFireblogResults } = useFireblog()

  // const navigate = useNavigate();

  const handleToggleNewBlog = () => {
    dispatch({
      type: "TOGGLE_VISIBLE",
      payload: {
        newValue: !newBlog.visible
      }
    })
  }
  
  const fetchBlogs = () => {
    if (blogs.status !== "FETCHING") return

    getFireblogResults(blogs.blogs, blogs.lastBlog)
      .then(([newBlogs, newLastBlog, newHasMore]) => {
        console.log ("Returning from Firebase module", newBlogs, newLastBlog, newHasMore)

        dispatchBlogs({
          type: "BLOGS_RESOLVED",
          payload: {
            newBlogs,
            newLastBlog,
            newHasMore
          }
        })
      })
      .catch((err) => {
        console.log(err.message)
      }) 
  }
  
  useEffect(() => {
    switch (blogs.status) {
      case "EMPTY":
        console.log("Home: useEffect status switch, status=", blogs.status)
        dispatchBlogs({
          type: "FETCH",
          payload: {}
        })
      case "FETCHING":
        console.log("Home: useEffect status switch, status=", blogs.status)
        fetchBlogs()

        // dispatchBlogs({
        //   type: "REQUESTED",
        //   payload: {}
        // })

      case "WAITING":
        console.log("Home: useEffect status switch, status=", blogs.status)
        return
      case "UPDATED":
        console.log("Home: useEffect status switch, status=", blogs.status)
        return
      default:
        return
    }
  }, [blogs.status])

  // const updateBlogs = () => {
  //   if (isBlogsLoading) return;
    
  //   setIsBlogsLoading(true)
  //   getFireblogResults(blogs, lastBlog)
  //     .then(([newBlogs, newLastBlog, newHasMore]) => {
  //       setBlogs(newBlogs)
  //       setLastBlog(newLastBlog)
  //       setHasMore(newHasMore)

  //       console.log ("Returning from Firebase module", newBlogs, newLastBlog, newHasMore)
  //       setIsBlogsLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err.message)
  //       setIsBlogsLoading(false)
  //     }) 
  // }

  // useEffect(() => {
  //   !currentUser && navigate("/", { replace: true} )
  // }, [currentUser])

  useEffect(() => {
    dispatch({
      type: "UPDATE_AUTHOR",
      payload: {
        userName
      }
    })
  }, [newBlog.author])

  // useEffect(() => {
  //   updateBlogs()
  // },[])

  return (
    <>
    <Bar toggleNewBlog={handleToggleNewBlog}/>
    <Divider />

    {newBlog.visible && <BlogEntry newBlogState={newBlog} newBlogDispatch={dispatch}/>}
    
    {blogs && <BlogContainer 
      blogs={blogs.blogs} 
      dispatchBlogs={dispatchBlogs}
      lastBlog={blogs.lastBlog} 
      hasMore={blogs.hasMore}
      // isBlogsLoading={isBlogsLoading}
      uploadingImage={newBlog.uploadingImage}
      // updateBlogs={updateBlogs}
    />}
    </>
  )
};

export default Home;
