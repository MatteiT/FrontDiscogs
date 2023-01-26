import React from 'react'
import NewCollectionForm from '../features/collection/NewCollectionForm'
import CollectionList from '../features/collection/CollectionList'
import { Box, Stack } from '@mui/material'
import '../styles/index.css'
const Collection = () => {
  return (
    <>
      <Stack direction="column" p={2} m={2} className="border">
        <h1> Your Collection</h1>
        <Box p={2} m={2} className="border">
          <NewCollectionForm />   
        </Box>
        <Box p={2} m={2} className="border">
          <CollectionList />
        </Box>
      </Stack>
    </>
  )
}

export default Collection
