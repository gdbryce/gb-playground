import React from 'react'
import { useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Dropzone from 'react-dropzone'

const BlogImageDropzone = () => {
  const [droppedBlogImage, setDroppedBlogImage] = useState();
  const [droppedBlogImageURL, setDroppedBlogImageURL] = useState();

  const handleImageDrop = acceptedFiles => {
    setDroppedBlogImage(acceptedFiles[0]);
    setDroppedBlogImageURL(URL.createObjectURL(acceptedFiles[0]));
  };

  const resetImage = e => {
    e.preventDefault();

    setDroppedBlogImage(null);
    setDroppedBlogImageURL(null);
  };

  return (
    <>
    {droppedBlogImage &&
      <ImageList
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: 200
        }}
        onClick={resetImage}
      >
        <ImageListItem key="BlogEntry-droppedImage">
          <img
            // loading="lazy" 
            src={droppedBlogImageURL} 
            alt="testing dropzone url" 
            onClick={resetImage}
          />
          <ImageListItemBar 
            title="Click to remove"
          />
        </ImageListItem>
      </ImageList>

        // <Box
        //   sx={{
        //     m: 1,
        //     width: "100%",
        //     maxHeight: 200
        //   }}
        //   onClick={resetImage}
        // >
        //     <img src={droppedBlogImageURL} alt="testing dropzone url" onClick={resetImage}/>
        //     <Box
        //       sx={{
        //         p: 1
        //       }}
        //       onClick={resetImage}
        //     >
        //       <Typography
        //         variant="subtitle2"
        //       >
        //         Click to remove
        //       </Typography>
        //     </Box>
        // </Box>>
    }

    {!droppedBlogImage &&
      <Dropzone onDrop={acceptedFiles => handleImageDrop(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7]
                }
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <UploadIcon />
              <Typography paragraph>Drag and drop a file, or click here</Typography>
            </Box>
          )}
      </Dropzone>
    }
    </>
  )
}

export default BlogImageDropzone
