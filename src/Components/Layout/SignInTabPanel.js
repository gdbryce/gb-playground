import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Divider, Stack } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logInWithEmailAndPassword, signInWithGoogle, sendPasswordReset } from "../../Core/Firebase" 

const SignInTabPanel = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ user, loading, error ] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) return navigate("/LoginTest");
  }, [ user, loading ])

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
          id="SignInEmail"
          label="Email Address"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          required
          fullWidth
          id="SignInPassword"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          {email && <Button 
            variant="contained"
            id="SignInForgotPassword"
            onClick={() => sendPasswordReset(email)}
            >
            Forgot Password
          </Button>}
          {!email && <Button 
            variant="contained"
            id="SignInForgotPassword"
            disabled
            >
            Forgot Password
          </Button>}
          <Button 
            variant="contained"
            id="SignInUserNamePassword"
            onClick={() => logInWithEmailAndPassword(email, password)}
            >
            Sign In
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
            id="SignInGoogleAuth"
            onClick={() => signInWithGoogle()}
            >
            sign in with google
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default SignInTabPanel
