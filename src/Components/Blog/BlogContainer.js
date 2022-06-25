import { Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import BlogCard from './BlogCard'

const BlogContainer = ({ blogs, uploadingImage }) => {
  return (
    <Container sx={{mt: 2}}>
      <Stack spacing={2}>
      {blogs && blogs.map((blog) => {
        // console.log(blog)
        return (
          <BlogCard 
            key={blog.id} 
            blog={blog}
            uploadingImage={uploadingImage}
          />
        )
      })}
      </Stack>
    </Container>
  )
}

export default BlogContainer
