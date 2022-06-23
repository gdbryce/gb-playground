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
            key={item.title}
            color="secondary"
            onClick={item.action}
          >
            {item.title}
          </Button>
        )
      })}
    </Stack>
  )
}

NavButtonStackMenu.propTypes = {
  menuItems: PropTypes.array
};

export default NavButtonStackMenu
