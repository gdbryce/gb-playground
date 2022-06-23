import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
// import PropTypes from 'prop-types'

// import { useAuthState } from 'react-firebase-hooks/auth'

import { AuthContext } from '../../Contexts/AuthProvider';

import { auth, db, logout } from '../../Core/Firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
import useAvatar from '../../Hooks/useAvatar';

const NavAvatarMenu = () => {
  const { userName } = useContext(AuthContext);
  // const [ user, loading, error ] = useAuthState(auth);
  // const [ name, setName ] = useState("");
  const [ anchorElUser, setAnchorElUser ] = useState(null);
  const [ avatarInitials, avatarColor ] = useAvatar(userName);

  const navigate = useNavigate();

  // const fetchUserName = async () => {
  //   try {
  //     console.log("Firestore: Query to user");
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //     updateStringAvatar(data.name);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     alert(err.message);
  //   }
  // };

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

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) fetchUserName();
  // }, [ user, loading ])

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
