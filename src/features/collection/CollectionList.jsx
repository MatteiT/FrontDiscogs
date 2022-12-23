import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useDeleteCollectionMutation, useGetAllCollectionsQuery, useGetCollectionQuery } from './CollectionSlice'
import { useNavigate } from 'react-router-dom'



const CollectionList = ( ) => {
    const { data, isLoading, error } = useGetAllCollectionsQuery()
    const [deleteCollection] = useDeleteCollectionMutation()
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        try {
            await deleteCollection({id: id})
            navigate(`/collections/${id}`)
        } catch (err) {
            console.log(err)
        }
    }


    if (isLoading) return 'Loading...'
    if (error) return `An error has occurred: ${error.message}`


    return (
    <>
        <Box border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2}>
            <h1>Collection List</h1>
            <Grid container spacing={2} alignContent="center" justifyContent="center" direction="column">
                {data.map(collection => (
                    <Grid container spacing={2} alignContent="center" justifyContent="center" direction="row" key={collection._id}  >
                        <Box  border={1} borderColor="primary.main" borderRadius={2} padding={2} margin={2} >
                            <h2>{collection.title}</h2>
                            <p>{collection.text}</p>
                            <Button variant="contained" onClick={() =>  navigate(`/collections/${collection._id}`)}>View Collection</Button>
                            <Button variant="contained" onClick={() => handleDelete(collection._id)}>Delete Collection</Button>
                        </Box>
                    </Grid>
                ))}
                </Grid>
            </Box>
    </>
    )
}


export default CollectionList
