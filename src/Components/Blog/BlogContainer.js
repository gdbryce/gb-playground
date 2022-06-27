import { Container, Stack } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import BlogCard from './BlogCard'

const BlogContainer = ({ blogs, lastBlog, hasMore, uploadingImage, setPageNumber }) => {
  const  lastBlogRef = useRef()

  const lastBlogComponentCallback = useCallback((node) => {
    if (lastBlogRef.current) lastBlogRef.current.disconnect()

    lastBlogRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prev) => prev + 1)
      }
    })

    if(node) lastBlogRef.current.observe(node)
  }, [hasMore])
  
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
          blog.id === lastBlog?.id && hasMore ?
          <div
            ref={lastBlogComponentCallback}
            key={blog.id} 
          >
            <BlogCard 
              blog={blog}
              uploadingImage={uploadingImage}
            />
          </div>
          :
          <div
            key={blog.id} 
          >
            <BlogCard 
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
