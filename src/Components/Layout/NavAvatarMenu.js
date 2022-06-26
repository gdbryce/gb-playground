import React, { useState, useContext } from 'react'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { AuthContext } from '../../Contexts/AuthProvider';

import { auth, db, logout } from '../../Core/Firebase';
import useAvatar from '../../Hooks/useAvatar';

const NavAvatarMenu = () => {
  const { userName } = useContext(AuthContext);
  const [ anchorElUser, setAnchorElUser ] = useState(null);
  const [ avatarInitials, avatarColor ] = useAvatar(userName);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    console.log("Calling handle logout")
    logout()
  }
  
  const menuOptions = [
    {
      title: "Profile",
      action: handleCloseUserMenu
    }, 
    {
      title: "Sign Out",
      action: handleLogout
    }];

  return (
    <>
      <Tooltip title="Profile Settings">
        <IconButton 
          onClick={handleOpenUserMenu}
          sx={{
            p: 0
          }}>
          {avatarInitials && <Avatar
            alt={`Avatar for ${userName}`}
            sx={{
              bgcolor: avatarColor
            }}
          >
            {avatarInitials}
          </Avatar>}
        </IconButton>
      </Tooltip>

      <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {menuOptions.map((item) => (
            <MenuItem
              key={item.title}
              onClick={item.action}
            >
              <Typography textAlign="center">
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
    </>
  )
}

export default NavAvatarMenu
