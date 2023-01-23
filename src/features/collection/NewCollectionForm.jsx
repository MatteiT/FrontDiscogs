import React, { useEffect, useState } from 'react'
import { Button, TextField, FormControl, Grid, Box, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAddCollectionMutation } from './CollectionSlice'
import { useSelector } from 'react-redux'

const NewCollectionForm = () => {
  const [addCollection] = useAddCollectionMutation()
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useSelector(state => state.auth)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const title = e.target.collectionName.value
    if (title === ''){
      setMessage ('Collection name is required')
      return;
    }
    setIsLoading(true)
    try{
      const collection = {
          user: userId,
          title,
          text: e.target.collectionDescription.value
      }
      const {data} = await addCollection( collection)
    if (data.status === 200) {
        setMessage('Collection added successfully')
        navigate('/collections')
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error adding collection')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (message || error) {
        setTimeout(() => {
          setMessage(null)
          setError(null)
        }, 2000)
    }
}, [message, error])

  return (
    <Grid container direction="column">
      <FormControl component="fieldset">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Collection Name"
            variant="outlined"
            name="collectionName"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Collection Description"
            variant="outlined"
            name="collectionDescription"
            fullWidth
            margin="normal"
          />
          {(message || error) && (
            <Alert severity={message ? "success" : "error"}>
              {message || error}
            </Alert>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isLoading}
          >
            Add a new Collection
          </Button>
        </form>
      </FormControl>
    </Grid>
  )
}

export default NewCollectionForm
