import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import useAvatar from '../../Hooks/useAvatar'
import useBlogImage from '../../Hooks/useBlogImage'

const BlogCard = ( { blog, uploadingImage } ) => {
  const [ avatarInitials, avatarColor ] = useAvatar(blog.author);
  const { imageURL } = useBlogImage(blog.id, blog.blogMeta, uploadingImage);

  
  useEffect(() => {
    console.log("BlogCard: id=", blog.id)
  },[])

  return (
    <Card
      sx={{ 
        width: {xs: "100%", md: "60vw"}, 
        mx: {xs: 0, md: "auto" }
      }}
    >
      {blog && 
        <>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: avatarColor
              }}
            >
              {avatarInitials}
            </Avatar>
          }
          title= {
            <Typography
              variant= "h4"
              component= "h6"
              sx= {{ 
                wordBreak: "break-word",
                overflow: "hidden"
              }}
            >
              {blog.title}
            </Typography>
          }
          action={
            <IconButton aria-label="blog options">
              <MoreVertIcon />
            </IconButton>
          }
          />
        
        <CardActionArea>
          {blog.blogMeta.hasBlogImage &&
          <CardMedia
            sx= {{ maxHeight: {xs: "20vh", md:"40vh"}}}
            component="img"
            image={imageURL}
            alt="blog image retrieved from GCS"
          />}
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
            >
              {blog.blogText}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
            >
              {blog.posted && blog.posted.toDate()
                .toLocaleDateString('en-GB', 
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
        </>
      }
    </Card>
  )
}

export default BlogCard
