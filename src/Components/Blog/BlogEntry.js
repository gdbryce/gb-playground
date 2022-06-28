import React, { useState, useEffect } from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ImageIcon from '@mui/icons-material/Image';  
import EventIcon from '@mui/icons-material/Event';
import { Box, ToggleButtonGroup, ToggleButton, Container, Paper, TextField, Button, Stack, Typography } from '@mui/material';
import BlogImageDropzone from './BlogImageDropzone';

import { submitBlogToFirestore } from '../../Core/Firebase';
import BlogEventEntry from './BlogEventEntry';

const buttons = [
  <ToggleButton key="BlogEntry-btn-blogText" value="blogText"><TextSnippetIcon /></ToggleButton>,
  <ToggleButton key="BlogEntry-btn-blogImage" value="blogImage"><ImageIcon /></ToggleButton>,
  <ToggleButton key="BlogEntry-btn-blogEvent" value="blogEvent"><EventIcon /></ToggleButton>
]

const BlogEntry = ({ newBlogState, newBlogDispatch }) => {
  const [buttonSelections, setButtonSelections] = useState(() => ["blogText"]);

  const handleImageDrop = acceptedFiles => {
    newBlogDispatch({
      type: "UPDATE_BLOG_IMAGE",
      payload: {
        image: acceptedFiles[0],
        imageURL: URL.createObjectURL(acceptedFiles[0])
      }
    })
  };

  const resetImage = e => {
    e.preventDefault();
    
    newBlogDispatch({
      type: "UPDATE_BLOG_IMAGE",
      payload: {
        image: null,
        imageURL: null
      }
    })
  };

  const handleNewSelection = (event, newSelections) => {
    if (newSelections.includes("blogText") || newSelections.includes("blogImage")) {
      setButtonSelections(newSelections)
      newBlogDispatch({
        type: "UPDATE_BLOG_META",
        payload: {
          blogMeta: {
            hasBlogText: newSelections.includes("blogText"),
            hasBlogImage: newSelections.includes("blogImage"),
            hasBlogEvent: newSelections.includes("blogEvent")
          }
        }
      })
    }
  }

  const submitBlog = () => {
    // Do some validations
    if (!newBlogState.title) return;
    if (buttonSelections.includes("blogText")  && !newBlogState.blogText) return;
    if (buttonSelections.includes("blogImage") && !newBlogState.image) return;

    console.log("Submit Blog passed validations") 

    newBlogDispatch({
      type: "SUBMITTING",
      payload: {}
    })

    // Submit to the blog useing the firebase core module
    submitBlogToFirestore(
      newBlogState,
      setUploadingImage
    )

  }

  // Struturing props for passing to BlogImageDropzone component
  // This will allow all state to be managed by this BlogEntry component
  // Which will then use the useFireblog hook to write to firestore and GCS
  const imageProps = {
    droppedBlogImage: newBlogState.image,
    droppedBlogImageURL: newBlogState.imageURL,
    handleImageDrop,
    resetImage,
  }

  const setUploadingImage = (filename) => {
    newBlogDispatch({
      type: "UPDATE_UPLOADING_IMAGE",
      payload: {
        uploadingImage: filename
      }
    })
  }

  useEffect(() => {
    if (newBlogState.submitting) {
      if (newBlogState.uploadingImage) return;

      newBlogDispatch({
        type: "RESET_NEW_BLOG",
        payload: {}
      })
    }
  }, [newBlogState])

  return (
    <Container
      sx={{
        my: 2,
        maxWidth: {xs: "100%", md: "60vw"}, 
      }}
    >
      <Paper
        sx={{ 
          maxWidth: {xs: "100%", md: "60vw"}, 
          mx: {xs: 0, md: "auto" }
        }}
      >
        {/* Blog Title - full width of the paper at the header */}
        <Box
          sx={{
            overflow: "hidden",
            p: 2
          }}
        >
          <TextField 
            fullWidth
            id="BlogEntry-title"
            label="Add your title here..."
            required
            variant="standard"
            value={newBlogState.title}
            onChange={(e) => newBlogDispatch({type: "UPDATE_BLOG_TITLE", payload: {title: e.target.value}})}
          />
        </Box>

        {/* Blog Body - 2 boxes within a container flex box with a columnar flex direction */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          {/* Left hand pane - horizonal button group */}
          <Box
            sx={{
              display: "flex",
              minHeight: 200,
              m: 1
            }}
          >
            <ToggleButtonGroup
              orientation="vertical"
              aria-label="blog entry button group for selecting blog features"
              value={buttonSelections}
              onChange={handleNewSelection}
              color="secondary"
              size="large"
            >
              {buttons}
            </ToggleButtonGroup>
          </Box>

          {/* Right hand pane, text area and drop panel */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              m: 1
            }}
          >

            {buttonSelections.includes("blogImage") && 
              <Box
                sx={{
                  m: 1,
                  display: "flex",
                  flexGrow: 1,
                  minHeight: 150
                }}
              >
                <BlogImageDropzone {...imageProps}/>
              </Box>
            }

            {buttonSelections.includes("blogText") && 
            <Box
              sx={{
                m: 1
              }}
            >
              <TextField 
                id="BlogEntry-blogText"
                multiline
                fullWidth
                variant='filled'
                label="Write something..."
                value={newBlogState.blogText}
                onChange={(e) => newBlogDispatch({type: "UPDATE_BLOG_TEXT", payload: {blogText: e.target.value}})}
              />
            </Box>
            }

            {/* Event Container */}
            {buttonSelections.includes("blogEvent") &&
            <Box
              sx={{
                m: 1
              }}
            >
              <Typography variant="subtitle1" sx={{mb: 2}}>Tell us about your event...</Typography>
              <BlogEventEntry />
            </Box>
            }

          </Box>
        </Box>

        {/* Button menu - Cancel and Submit */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: 1
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              p: 1
            }}
          >

            <Button 
              id="BlogEntry-btn-cancel" 
              color="primary" 
              variant="contained"
            >
              cancel
            </Button>

            <Button 
              id="BlogEntry-btn-submit" 
              color="secondary" 
              variant="contained"
              onClick={submitBlog}
            >
              submit
            </Button>

          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default BlogEntry
