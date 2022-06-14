import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React from 'react'
import { Button, Divider, Stack } from '@mui/material'

const SignUpTabPanel = () => {
  return (
    <div>
      <Box
        noValidate
        component="form"
        autoComplete="off"
      >
        <Box
          noValidate
          component="form"
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { 
              mr: 1, 
              width: '48%'
            },
          }}
        >
          <TextField 
            required
            id="SignUpFirstName"
            label="First Name"
            variant="outlined"
            margin="normal"
          />
          <TextField 
            required
            id="SignUpLastName"
            label="Last Name"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Divider>Sign Up with Username and Password</Divider>
        <TextField 
          fullWidth
          id="SignUpEmail"
          label="Email Address"
          type="email"
          variant="outlined"
          margin="normal"
        />
        <TextField 
          fullWidth
          id="SignUpPassword"
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
            Sign Up
          </Button>
        </Stack>
        <Divider>Or</Divider>
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
            sign Up with google
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default SignUpTabPanel
