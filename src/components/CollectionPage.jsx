import React from 'react'
import NewCollectionForm from '../features/collection/NewCollectionForm'
import CollectionList from '../features/collection/CollectionList'
import{ Box, FormControl } from '@mui/material'
import { Stack } from '@mui/system'


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
              <NewCollectionForm />        
              <CollectionList />
      </Stack>
    </>
  )
}

export default Collection