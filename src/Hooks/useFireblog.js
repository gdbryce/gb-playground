import { useState, useEffect } from 'react'

import { auth, db } from '../Core/Firebase';
import { onSnapshot, collection, query, where, getDocs, orderBy, limit, startAt} from 'firebase/firestore';


export default function useFireblog(pageNumber, uploadingImage) {
  const [blogs, setBlogs] = useState()
  const [lastBlog, setLastBlog] = useState()

  const pageLimit = 5
  
  async function getFirstResults() {
    console.log("Hitting first query")
    if (!blogs) {
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
    
    setBlogs((prev) => ({... new Set({...prev, ...blogs})}))
    setLastBlog(querySnapshot.docs[pageLimit-1])
  }

  useEffect(() => {
    console.log(`useFireblog useEffect called, dependency - pageNumber = ${pageNumber}`)
    // if(!blogs) {
    //   blogControl.pageNumber === 1 || blogControl.refresh ? getFirstResults() : getNextResults()
    // }
    // else {
    //   if(blogControl.pageNumber > 1) getNextResults()
    // }

    // Moving to a query snapshot with a variable limit
    const q = query(collection(db, "testBlogs"),
                      orderBy("posted", "desc"),
                      limit(pageLimit * pageNumber))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })

      setBlogs(blogs)
      setLastBlog(snapshot.docs[pageLimit-1].id)
    })

    return() => unsubscribe()
  }, [pageNumber, uploadingImage])

  return { blogs, lastBlog };
}
