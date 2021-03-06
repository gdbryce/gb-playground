import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import TabPanel from '../../Utils/TabPanel';
import { makeStyles } from '@mui/styles';
import SignInTabPanel from './SignInTabPanel';
import SignUpTabPanel from './SignUpTabPanel';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => {
  return {
    signInUpContainer: {
      height: '100vh',
      marginTop: '25vh'
    },
    signInUpLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      miHeight: 'auto'
    },
    signInUpBox: {
      backgroundColor: '#cccd'
    },
    signInUpAppBar: {
      boxShadow: 'none'
    },
    signInUpTabLabel: {
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
    <Container maxWidth='md' className={classes.signInUpContainer}>
      <Box className={classes.signInUpBox}>
        <div className={classes.signInUpLogo}>
          <img src="images/fireBlogLogoAlpha.png" alt="FireBlog Logo" />
        </div>
        <AppBar position="static" color='transparent' className={classes.signInUpAppBar}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs for sign in and sign up"
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <SignInTabPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SignUpTabPanel />
        </TabPanel>
      </Box>
    </Container>
  )
}

export default SignInUpPanel
