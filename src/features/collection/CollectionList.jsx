import React from 'react'
import { Box, Button} from '@mui/material'
import { useGetAllCollectionsQuery, useDeleteCollectionMutation } from './CollectionSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const CollectionList = ( ) => {
    const [deleteCollection] = useDeleteCollectionMutation()
    const { userId } = useSelector(state => state.auth)
    const { data = [] } = useGetAllCollectionsQuery(userId)
    

    const navigate = useNavigate()

    const handleDelete = (collection) => {
        const { _id } = collection
        const confirmDelete = window.confirm('Are you sure you want to delete this collection?')
        if (confirmDelete, _id){
            deleteCollection(_id)
            navigate('/collections')
        }
    }

    return (< > 
                {data.map((collection) => (
                    <Box key={collection._id}>
                        < Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }} >
                            <h2>{collection.title}</h2>
                            <p>{collection.text}</p>
                        < Button variant="contained" onClick={() => navigate(`/collections/${collection._id}`)}>
                            {collection.title}
                        </Button>
                        <Button variant="contained" onClick={() => handleDelete(collection)}>
                            Delete
                        </Button>
                        </Box>
                    </Box>
                ))}
            </>
    )
}

export default CollectionList
