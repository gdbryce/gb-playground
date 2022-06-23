import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import FireblogLogo from './FireblogLogo';
import NavHamburgerMenu from './NavHamburgerMenu';
import NavButtonStackMenu from './NavButtonStackMenu';
import NavAvatarMenu from './NavAvatarMenu';

import { logout } from '../../Core/Firebase';

const Bar = ( { toggleNewBlog } ) => {
  const handleHomeClick = () => {
    console.log("Home Clicked")
  }

  const navMenuItems = [
    {
      title: "Home",
      action: handleHomeClick
    },
    {
      title: "Add Blog",
      action: toggleNewBlog
    },
    {
      title: "Log Out",
      action: logout
    }
  ];

  return (
    <AppBar 
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* 
            * Logo on left of the app bar displayed on medium screens onwards
            * Display is set to none on smaller screens
          */}
          <Box
            sx={{
              p:1,
              mr: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center"
            }}
          >
            <FireblogLogo />
          </Box>

          {/* 
            * Menu with icon to be displayed on the left hand screen on smaller screens
            * Display is set to none on medium and larger screens
          */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1
            }}
          >
            <NavHamburgerMenu menuItems={navMenuItems} />
          </Box>

          {/* 
            * Logo Centered in App bar on small screens
          */}
          <Box
            sx={{
              p:1,
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              alignItems: "center"
            }}
          >
            <FireblogLogo />
          </Box>
          
          {/* 
            * Expanded menu to be displayed on medium and larger screens
            * Display is set to none on smaller screens
          */}
          <Box
            sx={{
              p:1,
              mr: 1,
              display: { xs: "none", md: "flex" },
              flexGrow: 1
            }}
          >
            <NavButtonStackMenu menuItems={navMenuItems} />
          </Box>

          <Box
            sx={{
              flexGrow: 0
            }}
          >
            <NavAvatarMenu />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Bar;
