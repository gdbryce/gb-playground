import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import TabPanel from '../Utils/TabPanel';
import { makeStyles } from '@mui/styles';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => {
  return {
    SignInUpContainer: {
      height: '100vh'
    },
    signInUpBox: {
      backgroundColor: 'black'
    },
    SignInUpAppBar: {
      boxShadow: 'none',
      marginTop: '25vh',
    },
    SignInUpTabLabel: {
      color: 'white'
    }
  }
});

const SignInUpPanel = () => {
  const [ tabValue, setTabValue ] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth='md' className={classes.SignInUpContainer}>
      <Box className={classes.SignInUpBox}>
        <AppBar position="static" color='transparent' className={classes.SignInUpAppBar}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs for sign in and sign up"
          >
            <Tab label="Sign In" sx={{color: 'white'}} {...a11yProps(0)} />
            <Tab label="Sign Up" sx={{color: 'white'}} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Box>
          <TabPanel value={tabValue} index={0}>
            <Typography sx={{color: 'white'}}>Item One and then some text to make it larger</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          <Typography sx={{color: 'white'}}>Why not have something different</Typography>
          </TabPanel>
        </Box>
      </Box>
    </Container>
  )
}

export default SignInUpPanel
