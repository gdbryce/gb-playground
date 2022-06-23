import React, { useState } from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ImageIcon from '@mui/icons-material/Image';  
import EventIcon from '@mui/icons-material/Event';
import { Box, ToggleButtonGroup, ToggleButton, Container, Paper, TextField, Typography, Button, Stack } from '@mui/material';

const buttons = [
  <ToggleButton key="BlogEntry-btn-blogText" value="blogText"><TextSnippetIcon /></ToggleButton>,
  <ToggleButton key="BlogEntry-btn-blogImage" value="blogImage"><ImageIcon /></ToggleButton>,
  <ToggleButton key="BlogEntry-btn-blogEvent" value="blogEvent"><EventIcon /></ToggleButton>
]

const BlogEntry = () => {
  const [buttonSelections, setButtonSelections] = useState(() => ["blogText"]);

  const handleNewSelection = (event, newSelections) => {
    if (newSelections.includes("blogText") || newSelections.includes("blogImage"))
      setButtonSelections(newSelections)
  }

  return (
    <Container
      sx={{
        my: 2
      }}
    >
      <Paper
        sx={{
          maxWidth: 600
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
                  m: 1
                }}
              >
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet quibusdam recusandae architecto dolor libero perferendis vitae enim, temporibus quas vel, adipisci quam quaerat ad aspernatur magnam repellendus iusto ab dolores.
                </Typography>
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
              />
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
