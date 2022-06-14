import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button, Divider, Stack, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, logout } from '../../Core/Firebase';

const LoginTest = () => {
  const [ user, loading, error ] = useAuthState(auth);
  const [ name, setName ] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    }
    catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [ user, loading ])

  return (
    <div>
      <Typography variant="h1">Logged in as:</Typography>
      <Typography variant="h2">User: {name}</Typography>
      <Typography variant="h2">Email: {user?.email}</Typography>
      <Divider />
      <Stack
        direction="row"
      >
        <Button 
          variant="contained"
          onClick={logout}>Sign Out</Button>
      </Stack>
    </div>
  )
};

export default LoginTest;
