import { Container, Stack } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import BlogCard from './BlogCard'

const BlogContainer = ({ blogs, lastBlog, hasMore, isBlogsLoading, uploadingImage, updateBlogs }) => {
  const  lastBlogRef = useRef()

  const lastBlogComponentCallback = useCallback((node) => {
    if (lastBlogRef.current) lastBlogRef.current.disconnect()

    lastBlogRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isBlogsLoading) {
        console.log ("Intersection detected")
        updateBlogs()
      }
    })

    if(node) lastBlogRef.current.observe(node)
  }, [])
  
  return (
    <Container 
      sx={{
        mt: 2,
        maxWidth: {xs: "100%", md: "75vw"}, 
      }}
    >
      <Stack spacing={2}>
      {blogs && blogs.map((blog) => {
        return (
          blog.id === lastBlog?.id && hasMore && !isBlogsLoading ?
          <div
            ref={lastBlogComponentCallback}
            key={blog.id} 
          >
            <BlogCard 
              id={`BlogCard-${blog.id}`}
              blog={blog}
              uploadingImage={uploadingImage}
            />
          </div>
          :
          <div
            key={blog.id} 
          >
            <BlogCard 
              id={`BlogCard-${blog.id}`}
              blog={blog}
              uploadingImage={uploadingImage}
            />
          </div>
        )
      })}
      </Stack>
    </Container>
  )
}

export default BlogContainer
