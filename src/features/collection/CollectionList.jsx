import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Modal} from '@mui/material'
import { useGetAllCollectionsQuery, useDeleteCollectionMutation } from './CollectionSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CollectionList = ( ) => {
    const { userId } = useSelector(state => state.auth)
    const { data, isLoading, isError } = useGetAllCollectionsQuery(userId)
    const [deleteCollection, { isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteCollectionMutation()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [collectionToDelete, setCollectionToDelete] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const filteredData = data?.filter(collection => collection.user === userId)
    
    const handleDelete = (collection) => {
        setModalOpen(true)
        setCollectionToDelete(collection)
    }

    const handleConfirmDelete = async () => {
        setModalOpen(false)
        try {
            await deleteCollection( collectionToDelete._id, userId );
            setSuccessMessage('Collection deleted successfully')
        } catch (err) {
            setErrorMessage('Error deleting collection')
        }
        setCollectionToDelete(null)
    }

    useEffect(() => {
        if (isDeleteError) {
            setErrorMessage('Error deleting collection')
        }
        if (successMessage) {
            setTimeout(() => {
                setSuccessMessage(null)
                navigate('/collections')
            }, 2000)
        }
    }, [isDeleteError, successMessage])
    
return (
    <>  
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }} >
            <h1>My Collections</h1>
            {successMessage && <Alert severity="success">{successMessage}</Alert> }
            {errorMessage && <Alert severity="error">{errorMessage}</Alert> }
            {isDeleteError && <h2>Error Occured</h2>}
        </Box>
        { filteredData ? (
            filteredData.length > 0 ? (
                filteredData.map((collection) => (
                    <Box key={collection._id}>
                        < Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }} >
                        
                            <h2>{collection.title}</h2>
                            <p>{collection.text}</p>
                        < Button variant="contained" onClick={() => navigate(`/collections/${collection._id}`)}>
                            {collection.title}
                        </Button>
                        <Button variant="contained"  onClick={() => handleDelete(collection)}>
                            Delete
                        </Button>
                        </Box>
                    </Box>
                ))
            ) : (
                <h2>No collections found</h2>
            )
        ) : (
            <h2>Loading...</h2>
        )}
        <Modal
            open={modalOpen} 
            onClose={() => setModalOpen(false)}
            sx={{ position: 'absolute', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 4, p: 4, }}
        >
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center', 
                flexDirection: 'column',  
                backgroundColor: 'white' 
                }}>
                <h2>Are you sure you want to delete this collection?</h2>
                <Button variant="contained" onClick={handleConfirmDelete}>Yes</Button>
                <Button variant="contained" onClick={() => setModalOpen(false)}>No</Button>
            </Box>
        </Modal>
    </>
    )
}

export default CollectionList
