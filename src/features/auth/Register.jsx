import React from 'react'
import { Box, Button, TextField, Stack, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAddUserMutation } from '../users/UserSlice'

const Register = () => {

    const [addUser, { error, isLoading }] = useAddUserMutation()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        }
        try {
            await addUser(user)
            navigate('/login')
        } catch (err) {
            console.log(err) 
        }
    }

    if (error) return `An error has occurred: ${error.message}`
    if (isLoading) return 'Loading...'

  return (
    <>
        <Box border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2}>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <Alert severity="info">All the fiels are required ! </Alert>
                {error && <Alert severity="error">{error.message}</Alert>}

                <Stack spacing={2}>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        variant="outlined"
                    />
                    <Button variant="contained" type="submit">Register</Button>
                </Stack>
            </form>
        </Box>
        <Button variant="contained"  onClick={() => navigate('/login')}>Login Instead</Button>
    </>
  )
}

export default Register