import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import useAvatar from '../../Hooks/useAvatar'
import useBlogImage from '../../Hooks/useBlogImage'

const BlogCard = ( { blog } ) => {
  const [ avatarInitials, avatarColor ] = useAvatar(blog.author);
  const { imageURL } = useBlogImage(blog.id, blog.blogMeta, false);

  // useEffect(() => {
  //   blog && updateStringAvatar(blog.blog.author);
  // }, [blog])
  // blog && console.log(blog)

  return (
    <Card 
      color="charcoal"
      sx={{ maxWidth: "40em" }}
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
          titleTypographyProps={{
            variant: "h4"
          }}
          title= {blog.title}
          action={
            <IconButton aria-label="blog options">
              <MoreVertIcon />
            </IconButton>
          }
          />
        
        <CardActionArea>
          {blog.blogMeta.hasBlogImage &&
          <CardMedia
            component="img"
            height="200em"
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
              {blog.posted.toDate().
                toLocaleDateString('en-GB', 
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
