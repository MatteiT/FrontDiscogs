import React, { useState } from 'react'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import { Box, Button, Stack } from '@mui/material'
import { useTransition, animated } from '@react-spring/web'
import styles from '../styles/app.css'

const FormTransition = ({ showForm }) => {
  const transition = useTransition(showForm === 'login', {
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    
  })
  
  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Login />
      </animated.div>
    ) : (
      <animated.div style={style}>
        <Register />
      </animated.div>
    )
  )
}

const Home = () => {
  const [showForm, setShowForm] = useState('login')

  return (
    <Stack spacing={2} direction="column" alignItems="center" justifyContent="center" >
    <Box className={styles.container} >
      <h1>Home</h1>
        <Button variant="contained" 
        onClick={() => setShowForm('login')} 
        className={styles.button}
        >
          Login
        </Button>
        <Button variant="contained" 
        onClick={() => setShowForm('register')} 
        className={styles.button}>
          Register
        </Button>
      <FormTransition showForm={showForm} />
    </Box>
    </Stack>
    
  )
}

export default Home

