import React from 'react'
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => {
  return {
    AppBarLogo: {
      width: "3rem",
      height: "auto"
    }
  }
});

const FireblogLogo = () => {
  const classes = useStyles();
  
  return (
    <>
      <img 
        className={classes.AppBarLogo}
        src="images/fireBlogLogoOnlyAlpha.png" 
        alt="App bar logo"
      />
      <Typography
        variant="h3"
        component="h2"
        align="center"
        sx={{
          px: 2,
          display:"inline"
        }}
      >
        FIREBLOG
      </Typography>
    </>
  )
}

export default FireblogLogo
