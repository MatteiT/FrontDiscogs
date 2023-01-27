import React, { useEffect } from 'react'
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

    useEffect(() => {
        if (error) {    
            const timeout = setTimeout(() => {
                setError(null)
            }, 5000)
            return () => clearTimeout(timeout)
        }
    }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        }
        try {
            const response = await login(user)
            if (response.error) {
                throw new Error(response.error.data.message)
            }
            dispatch(setCredentials(response.data.accessToken))
            dispatch(setUserId(response.data.id))
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
                <Stack  
                    spacing={3}
                    direction="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    p={2} 
                    m={2}>
                    <h1>Login</h1>
                        { error ? <Alert severity="error">{error}</Alert> : null }
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
                </Stack> 
            </form>
        </Grid>
        
    )
}

export default Login