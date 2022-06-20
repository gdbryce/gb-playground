import { useState, useEffect } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../Core/Firebase';
import { collection, query, where, getDocs, orderBy, limit, startAt } from 'firebase/firestore';


export default function useFireblog(pageNumber = 1) {
  const [blogs, setBlogs] = useState()
  const [lastBlog, setLastBlog] = useState()
  const [ user, loading, error ] = useAuthState(auth)

  const pageLimit = 5
  
  async function getFirstResults() {
    console.log("Hitting first query")
    if (!blogs && user) {
      console.log("Querying testBlogs")
      const q = query(collection(db, "testBlogs"),
                      orderBy("posted", "desc"),
                      limit(pageLimit))
      const docs = await getDocs(q)
      
      setBlogs(docs.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      }))
      setLastBlog(docs.docs[pageLimit-1])
    }
  }
  
  async function getNextResults() {
    if(user) {
      const q = query(collection(db, "testBlogs"),
                      orderBy("posted", "desc"),
                      startAt(lastBlog),
                      limit(pageLimit))
      const docs = await getDocs(q)

      setBlogs(...blogs, ...docs.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      }))
      setLastBlog(...docs.docs[pageLimit-1])
    }
  }

  useEffect(() => {
    if (loading) return;
    if (user && !blogs) getFirstResults();
  }, [user, loading])

  useEffect(() => {
    pageNumber === 1 ? getFirstResults() : getNextResults();
  }, [pageNumber])

  return { blogs, lastBlog };
}
