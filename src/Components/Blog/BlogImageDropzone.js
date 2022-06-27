import React from 'react'
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Dropzone from 'react-dropzone'

const BlogImageDropzone = ({
  droppedBlogImage,
  droppedBlogImageURL,
  handleImageDrop,
  resetImage
}) => {

  return (
    <>
    {droppedBlogImage &&
      <ImageList
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: 200,
          maxHeight: 300
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
