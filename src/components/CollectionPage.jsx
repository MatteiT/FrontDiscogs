import React from 'react'
import NewCollectionForm from '../features/collection/NewCollectionForm'
import CollectionList from '../features/collection/CollectionList'
import { Stack } from '@mui/system'
import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'


const Collection = () => {

  return (
    <>
      < Stack direction="column" 
        border={1} 
        borderColor="primary.main" 
        borderRadius={2} 
        padding={2} 
        margin={2}
        >
          <Grid container justifyContent="center" alignItems="center" direction={"column"} >
          <h1> Your Collection</h1>
          <Box border={1} borderColor="primary.main" borderRadius={2} p={2} m={2}>
              <NewCollectionForm />   
          </Box>
          <Box border={1} borderColor="primary.main" borderRadius={2} p={2} m={2}>
              <CollectionList />
          </Box>
          </Grid>
      </Stack>
    </>
  )
}

export default Collection