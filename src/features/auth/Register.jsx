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
        try {
            await addUser({
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value
            })
            setUsername('')
            setPassword('')
            setEmail('')
            navigate('/login')
            setError(null)
        } catch (err) {
            setError(err.message)
        }
    }

    if (isLoading) return 'Loading...'

return (
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
                <Button variant="contained" color='warning'  onClick={() => navigate('/login')}>Login Instead</Button>
            </Stack>
    </form>
  )
}

export default Register