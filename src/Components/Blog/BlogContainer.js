import { Container, Stack } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import BlogCard from './BlogCard'

const BlogContainer = ({ blogs, lastBlog, uploadingImage, setPageNumber }) => {
  const  lastBlogRef = useRef()

  const lastBlogComponentCallback = useCallback((node) => {
    if (lastBlogRef.current) lastBlogRef.current.disconnect()

    lastBlogRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPageNumber((prev) => prev++)
    })
  }, [blogs])
  
  return (
    <Container sx={{mt: 2}}>
      <Stack spacing={2}>
      {blogs && blogs.map((blog) => {
        // console.log(blog)
        console.log (`building BlogCard, blog id = ${blog.id} and the last blog = ${lastBlog}`)
        return (
          <div
            ref={blog.id === lastBlog ? lastBlogComponentCallback : null}
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
