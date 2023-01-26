import React, { useState } from 'react'
import { Button, TextField, Stack, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAddUserMutation } from '../users/UserSlice'

const Register = () => {

    const [addUser, { error, isLoading }] = useAddUserMutation()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorRegister, setError] = React.useState(null)
    

    
    const handleRegister = async (e) => {
        e.preventDefault()
        if (!username || !password || !email) {
            setError('All the fields are required !')
            return
        }
        if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
            setError('Password must contain at least 8 characters, at least one uppercase letter, one lowercase letter and one number')
            return
        }
        if (!username.match(/^[a-zA-Z0-9]+$/gm)) {
            setError('Username must contain only letters and numbers')
            return
        }
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm)) {
            setError('Email is not valid')
            return
        }
        const result = await addUser({ 
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        })
        if (result.error) {
            setError(result.error.message)
            return
        }
        navigate('/login')
    }


if (isLoading) return <div>Loading...</div>


return (
    <>
    {errorRegister ? <Alert severity="error">{errorRegister}</Alert> : null }
    { error ? <Alert severity="error">{error.message}</Alert> : null }
    { isLoading ? <Alert severity="info">Loading...</Alert> : null }
    <form onSubmit={handleRegister}>
        <Stack  
            spacing={3}
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            p={2} 
            m={2}>
            <h1>Register</h1>
                <Alert severity='info'>All the fileds are required !</Alert>
                { errorRegister ? <Alert severity="error">{errorRegister}</Alert> : null }
                <TextField
                    required
                    id="username"
                    label="Username"
                    variant="outlined"
                    type="text"
                    name='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        variant="outlined"
                        name='email'
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                <Button variant="contained" type="submit">Register</Button>
            </Stack>
    </form>
    </>
  )
}

export default Register