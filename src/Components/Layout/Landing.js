import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
  bgVideo: {
    position: "fixed",
    right: "0",
    bottom: "0",
    minWidth: "100%",
    minHeight: "100%"
    }
});

export default function Landing() {
  
  const classes = useStyles();

  return (
    <div>
      <video 
        className={ classes.bgVideo } 
        autoPlay
        loop
        muted
      >
        <source 
          className={ classes.bgVideo } 
          type="video/mp4" 
          src="./videos/Fuego_de_Refineria.mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
