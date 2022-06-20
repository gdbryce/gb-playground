import React, { useState } from 'react'
import useFireblog from '../../Hooks/useFireblog'

const BlogContainer = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { blogs, lastBlog } = useFireblog(pageNumber)

  console.log(blogs)
 
  return (
    <>
      {blogs && blogs.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </>
  )
}

export default BlogContainer
