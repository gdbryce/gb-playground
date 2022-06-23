import { useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage"

function useBlogImage( blogID, blogMeta, uploadingImage = false ) {
  const [ imageURL, setImageURL] = useState();

  const getBlogImage = blogID => {
      const storage = getStorage();
      if(`images/${blogID}.jpg` !== uploadingImage) {
          getDownloadURL(ref(storage, `images/${blogID}.jpg`))
              .then((url) => {
                  // console.log(url);
                  setImageURL(url);
              });
      }
  }

  useEffect(() => {
    if(blogMeta.hasBlogImage) getBlogImage(blogID);
  }, [imageURL, uploadingImage])

  return { imageURL }
}

export default useBlogImage
