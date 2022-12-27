import React from 'react'
import NewCollectionForm from '../features/collection/NewCollectionForm'
import CollectionList from '../features/collection/CollectionList'
import { Stack } from '@mui/system'
import { Box, Grid } from '@mui/material'


const Collection = () => {
  return (
    <>
      < Stack direction="column" 
        spacing={2} 
        alignItems="center" 
        border={1} 
        borderColor="primary.main" 
        borderRadius={2} 
        padding={2} 
        margin={2}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
          <h1> Your Collection</h1>
          <Box sx={{ width: '100%' }} border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2}>
              <NewCollectionForm />   
          </Box>
          <Box sx={{ width: '100%' }} border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2}>
              <CollectionList />
          </Box>
          </Grid>
      </Stack>
    </>
  )
}

export default Collection