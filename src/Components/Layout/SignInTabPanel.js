import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React from 'react'
import { Button, Stack } from '@mui/material'

const SignInTabPanel = () => {
  return (
    <div>
      <Box
        noValidate
        component="form"
        autoComplete="off"
      >
        <TextField 
          required
          fullWidth
          id="SignInUsername"
          label="Username"
          variant="outlined"
          margin="normal"
        />
        <TextField 
          required
          fullWidth
          id="SignInPassword"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <Button 
            variant="contained"
            >
            Sign In
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default SignInTabPanel
