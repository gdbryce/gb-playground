import { useEffect, useReducer, useContext } from 'react'
import { getFireblogResults, getFireblogImages } from '../Core/Firebase'
import { AuthContext } from '../Contexts/AuthProvider'

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
        status: "GATHER_IMAGES",
        blogs: payload.newBlogs,
        lastBlog: payload.newLastBlog,
        hasMore: payload.newHasMore
      }
    case "IMAGES_RESOLVED":
      return {
        ...state,
        status: "UPDATED",
        blogs: payload.newBlogs
      }
    default:
      return state
  }
}

function useBlogs() {
  const { userName } = useContext(AuthContext);
  const [newBlog, dispatchNewBlog] = useReducer(newBlogReducer, initialNewBlog);
  const [blogs, dispatchBlogs] = useReducer(blogsReducer, initialBlogs)


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

  const fetchBlogImages = () => {
    if (blogs.status !== "GATHER_IMAGES") return

    getFireblogImages(blogs.blogs)
      .then(newBlogs => {
        console.log("Firebase: Returning images")

        dispatchBlogs({
          type: "IMAGES_RESOLVED",
          payload: { newBlogs }
        })
      })
  }

  useEffect(() => {
    dispatchNewBlog({
      type: "UPDATE_AUTHOR",
      payload: {
        userName
      }
    })
  }, [newBlog.author])
  
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
      case "GATHER_IMAGES":
        console.log("Home: useEffect status switch, status=", blogs.status)
        fetchBlogImages()
      case "UPDATED":
        console.log("Home: useEffect status switch, status=", blogs.status)
        return
      default:
        return
    }
  }, [blogs.status])

  return [blogs, dispatchBlogs, newBlog, dispatchNewBlog]
}

export default useBlogs
