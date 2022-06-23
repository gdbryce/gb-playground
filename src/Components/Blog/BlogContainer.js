import { Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import useFireblog from '../../Hooks/useFireblog'
import BlogCard from './BlogCard'

const BlogContainer = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { blogs, lastBlog } = useFireblog(pageNumber)
 
  // console.log(blogs)

  return (
    <Container sx={{mt: 2}}>
      <Stack spacing={2}>
      {blogs && blogs.map((blog) => {
        // console.log(blog)
        return (
          <BlogCard 
            key={blog.id} 
            blog={{...blog}}
          />
        )
      })}
      </Stack>
    </Container>
  )
}

export default BlogContainer
