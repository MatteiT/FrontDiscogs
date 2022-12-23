import React from 'react'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import { Box, Button, TextField, Stack, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()

  return (

    <Box border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2}>
      <h1>Home</h1>
      <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
      <Button variant="contained" onClick={() => navigate('/register')}>Register</Button>
    </Box>
    
  )
}

export default Home