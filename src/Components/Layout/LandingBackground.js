import React from 'react'

import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => {
  return {
    bgVideo: {
      position: "fixed",
      right: "0",
      bottom: "0",
      minWidth: "100%",
      minHeight: "100%",
      zIndex: '-1'
    },
  };
});


const LandingBackground = () => {
  const classes = useStyles();

  return (
    <div>
      <video className={classes.bgVideo} autoPlay loop muted>
        <source
          className={classes.bgVideo}
          type="video/mp4"
          src="./videos/Fuego_de_Refineria.mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default LandingBackground
