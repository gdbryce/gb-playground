import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, logout } from '../../Core/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useStringAvatar from '../../Hooks/useStringAvatar';


const NavAvatarMenu = () => {
  const [ user, loading, error ] = useAuthState(auth);
  const [ name, setName ] = useState("");
  const [ anchorElUser, setAnchorElUser ] = useState(null);
  const [ stringAvatar, updateStringAvatar ] = useStringAvatar("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      updateStringAvatar(data.name);
    }
    catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
  }
  
  const menuOptions = [
    {
      title: "Profile",
      action: {handleCloseUserMenu}
    }, 
    {
      title: "SignOut",
      action: {handleLogout}
    }];

  useEffect(() => {
    if (loading) return;
    fetchUserName();
  }, [ user, loading, stringAvatar ])

  // useEffect(() => {
  //   if (!name) return;
  //   updateStringAvatar(name); 
  // }, [name])

  return (
    <>
      <Tooltip title="Profile Settings">
        <IconButton 
          onClick={handleOpenUserMenu}
          sx={{
            p: 0
          }}>
          {stringAvatar && <Avatar
            alt={`Avatar for ${name}`}
            sx={{
              bgcolor: stringAvatar.avatarColor
            }}
          >
            {stringAvatar.avatarInitials}
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
              onClick={handleCloseUserMenu}
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
