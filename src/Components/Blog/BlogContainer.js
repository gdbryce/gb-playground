import { Container, Stack } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import BlogCard from './BlogCard'

const BlogContainer = ({ blogs, blogsStatus, lastBlog, hasMore, dispatchBlogs, uploadingImage }) => {
  const  lastBlogRef = useRef()

  const lastBlogComponentCallback = useCallback((node) => {

    if (lastBlogRef.current) lastBlogRef.current.disconnect()

    lastBlogRef.current = new IntersectionObserver((entries) => {
      // if (entries[0].isIntersecting && hasMore) {
      //   console.log ("Intersection detected")
      //   status === "UPDATED" && dispatchBlogs({ type: "FETCH", payload: {} })
      // }
      entries.forEach(entry => {
        console.log ("Observer entry detected", entry)
        if(entry.isIntersecting && blogsStatus === "UPDATED") {
          console.log("Intersection detected", entry)
          dispatchBlogs({ type: "FETCH", payload: {} })
        }
      })
    })

    if(node) lastBlogRef.current.observe(node)
  }, [blogsStatus, hasMore])
  
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
          blog.id === lastBlog?.id && hasMore
          ? 
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
