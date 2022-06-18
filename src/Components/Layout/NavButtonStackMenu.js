import React from 'react'
import PropTypes from 'prop-types'

import { Button, Stack } from '@mui/material'

const NavButtonStackMenu = ( { menuItems } ) => {
  return (
    <Stack
      direction="row"
      spacing={2}
    >
      {menuItems.map(item => {
        return (
          <Button
            key={item}
            color="fireAccent"
          >
            {item}
          </Button>
        )
      })}
    </Stack>
  )
}

NavButtonStackMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string)
};

export default NavButtonStackMenu
