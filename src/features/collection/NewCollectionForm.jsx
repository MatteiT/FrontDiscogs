import React from 'react'
import { useState } from 'react'
import { Button, TextField, FormControl, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAddCollectionMutation } from './CollectionSlice'
import { useSelector } from 'react-redux'

const NewCollectionForm = () => {
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const [addCollection] = useAddCollectionMutation()
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useSelector(state => state.auth)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const title = e.target.collectionName.value
    const text = e.target.collectionDescription.value

    if (title === ''){
        setError('Please enter a title for your collection')
    }
      setIsLoading(true)
      const collection = {
        user: userId,
        title,
        text
      }
      addCollection(collection)
      setCollectionName('')
      setCollectionDescription('')
      setIsLoading(false)
      navigate('/collections')
  }

  if (isLoading) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`

  return (
<>
      <Grid container spacing={2} justifyContent="center">
          <FormControl component="fieldset">
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Collection Name"
                variant="outlined"
                name="collectionName"
                required
              />
              <TextField
                id="outlined-basic"
                label="Collection Description"
                variant="outlined"
                name="collectionDescription"
              />
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                Add a new Collection
              </Button>
            </form>
          </FormControl>
      </Grid>
</>
  )
}

export default NewCollectionForm