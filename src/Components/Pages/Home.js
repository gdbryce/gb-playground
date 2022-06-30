import React from 'react'
import { Divider } from '@mui/material'

import Bar from '../Layout/Bar';
import BlogContainer from '../Blog/BlogContainer';
import BlogEntry from '../Blog/BlogEntry';
import useBlogs from '../../Hooks/useBlogs' 

const Home = () => {
  console.log("loading Home")
  const [blogs, dispatchBlogs, newBlog, dispatchNewBlog] = useBlogs();

  const handleToggleNewBlog = () => {
    dispatchNewBlog({
      type: "TOGGLE_VISIBLE",
      payload: {
        newValue: !newBlog.visible
      }
    })
  }

  return (
    <>
    <Bar toggleNewBlog={handleToggleNewBlog}/>
    <Divider />

    {newBlog.visible && <BlogEntry newBlogState={newBlog} newBlogDispatch={dispatchNewBlog}/>}
    
    {blogs.blogs && <BlogContainer 
      blogs={blogs.blogs} 
      blogsStatus={blogs.status}
      dispatchBlogs={dispatchBlogs}
      lastBlog={blogs.lastBlog} 
      hasMore={blogs.hasMore}
      uploadingImage={newBlog.uploadingImage}
    />}
    </>
  )
};

export default Home;
