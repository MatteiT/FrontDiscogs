import React from 'react'
import { Box, Button, Stack} from '@mui/material'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
      }}
    >

      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Stack>
    </Box>
  )
}

export default Home