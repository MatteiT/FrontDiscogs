import React from 'react'
import { useState, useRef,useEffect } from 'react'
import { Button, TextField, FormControl, Grid, Alert, Stack, Box } from '@mui/material'
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
        const {accessToken, id} = await login(user).unwrap()// unwrap() is a method that returns the data from the promise
        dispatch(setCredentials(accessToken ))
        dispatch(setUserId(id)) 
        setPassword('')
        setUsername('')
        setEmail('')
        navigate('/collections')
        } catch (err) {
            if(err.status === 404){
                setError('Invalid username or password')
            } else if (err.status === 500) {
                setError('Server error')
            } else if (err.status === 400) {
                setError('Bad request')
            }else if (err.status === 401) {
                setError('Unauthorized')
            } else {
                setError('Something went wrong')
            }
    } 
    }

    
    useEffect(() => {
        inputRef.current.focus()
        error && setError(error)
    }, [username, password])


    if (isLoading) return 'Loading...'
    if (error) return `An error has occurred: ${error.message}`

    return (
        <>
        <Box border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    <h1>Login</h1>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        name="username"
                        required
                        value={username}
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
            </Box>
            <Button variant="contained"  onClick={() => navigate('/register')}>Register Instead</Button>

        </>

    )
}




export default Login