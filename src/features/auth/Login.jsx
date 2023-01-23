import React from 'react'
import { useState, useRef } from 'react'
import { Button, TextField, Grid, Alert, Stack} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {useLoginMutation} from './authApiSlice'
import { setCredentials, setUserId } from './authSlice'
import { useDispatch } from 'react-redux'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [login , {isLoading}] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        }
        try {
            const {data} = await login(user)
            dispatch(setCredentials(data.accessToken))
            dispatch(setUserId(data.id))
            navigate('/collections')
        } catch (err) {
            setError(err.message)
        }
        setEmail('')
        setPassword('')
        setUsername('')
    } 

    return (
        <Grid container justifyContent="center" alignItems="center">
            <form onSubmit={handleSubmit}>
                { error ? <Alert severity="error">{error}</Alert> : null }
                <Stack  
                    spacing={3}
                    direction="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    p={2} 
                    m={2}>
                    <h1>Login</h1>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        name="username"
                        required
                        value={username}
                        autoFocus={true}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={inputRef}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                    <Button variant="contained" color='warning' onClick={() => navigate('/register')}>Register Instead</Button>
                </Stack> 
            </form>
        </Grid>
        
    )
}

export default Login