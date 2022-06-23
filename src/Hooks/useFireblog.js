import { useState, useEffect } from 'react'

import { auth, db } from '../Core/Firebase';
import { collection, query, where, getDocs, orderBy, limit, startAt } from 'firebase/firestore';


export default function useFireblog(pageNumber = 1) {
  const [blogs, setBlogs] = useState()
  const [lastBlog, setLastBlog] = useState()

  const pageLimit = 5
  
  async function getFirstResults() {
    console.log("Hitting first query")
    if (!blogs) {
      console.log("Querying testBlogs")
      const q = query(collection(db, "testBlogs"),
                      orderBy("posted", "desc"),
                      limit(pageLimit))
      const querySnapshot = await getDocs(q)

      const blogs = querySnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })
      
      setBlogs(blogs)
      setLastBlog(querySnapshot.docs[pageLimit-1])
    }
  }
  
  async function getNextResults() {
    console.log("Hitting get next results query")
    const q = query(collection(db, "testBlogs"),
                    orderBy("posted", "desc"),
                    startAt(lastBlog),
                    limit(pageLimit))
    const querySnapshot = await getDocs(q)

    const blogs = querySnapshot.docs.map((doc) => {
      return {id: doc.id, ...doc.data()}
    })
    
    setBlogs(blogs)
    setLastBlog(querySnapshot.docs[pageLimit-1])
  }

  useEffect(() => {
    if(!blogs) {
      pageNumber === 1 ? getFirstResults() : getNextResults()
    }
    else {
      if(pageNumber > 1) getNextResults()
    }
  }, [pageNumber])

  return { blogs, lastBlog };
}
