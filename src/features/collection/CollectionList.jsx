import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Grid, List, ListItem, ListItemText, Modal, TextField} from '@mui/material'
import { useGetAllCollectionsQuery, useDeleteCollectionMutation, useUpdateCollectionMutation } from './CollectionSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CollectionList = ( ) => {
    const { userId } = useSelector(state => state.auth)
    // custom hook to fetch all collections
    const { data, refetch} = useGetAllCollectionsQuery(userId)
    const [deleteCollection] = useDeleteCollectionMutation()
    const [updateCollection] = useUpdateCollectionMutation()

    const navigate = useNavigate()
    // Modal handlers
    const [modalOpen, setModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    // Collection to delete or update
    const [collectionToDelete, setCollectionToDelete] = useState(null)
    const [collectionToUpdate, setCollectionToUpdate] = useState(null)
    // Updated title and description
    const [updatedTitle, setUpdatedTitle] = useState(null)
    const [updatedText, setUpdatedText] = useState(null)
    // Success and error messages
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const filteredData = data?.filter(collection => collection.user === userId)
    
    // Delete collection modal handlers 
    const handleDelete = (collection) => {
        setModalOpen(true)
        setCollectionToDelete(collection)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteCollection( collectionToDelete._id );
            setSuccessMessage('Collection deleted successfully')
            setCollectionToDelete(null)
            refetch()
        } catch (err) {
            setErrorMessage('Error deleting collection ' + err.message)
        }
        setModalOpen(false)
    }

    const handleUpdate = (collection) => {
        setUpdateModalOpen(true)
        setCollectionToUpdate(collection)
        setUpdatedTitle(collection.title)
        setUpdatedText(collection.text)
    }

    // Update collection modal handlers
const handleConfirmUpdate = async () => {
    try {
        await updateCollection({id: collectionToUpdate._id, title: updatedTitle, text: updatedText});
        setSuccessMessage('Collection updated successfully')
        setCollectionToUpdate(null)
        refetch()
    } catch (err) {
        setErrorMessage('Error updating collection ' + err.message)
    }
    setUpdateModalOpen(false)
}

    useEffect(() => {
        if (successMessage || errorMessage) {
            setTimeout(() => {
                setSuccessMessage(null)
                setErrorMessage(null)
            }, 2000)
        }
    }, [successMessage, errorMessage ])
    

return (
    <>  
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }} >
            <h1>My Collections</h1>
            { successMessage && <Alert severity="success">{successMessage}</Alert> }
            { errorMessage && <Alert severity="error">{errorMessage}</Alert> }
        </Box>
        <List>
        { filteredData ? (
            filteredData.length > 0 ? (
                filteredData.map((collection) => (
                    <ListItem key={collection._id}>
                        <ListItemText primary={collection.title} secondary={collection.text} />
                        <Button variant="contained" onClick={() => handleUpdate(collection)}>Update</Button>
                        <Button variant="contained" onClick={() => handleDelete(collection)}>Delete</Button>
                    </ListItem>
                ))
            ) : (
                <h2>No collections found</h2>
            )
        ) : (
            <h2>Loading...</h2>
        )}
        {/* Modal Delete */}
        <Modal open={modalOpen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey' }} onClose={() => setModalOpen(false)}>
        <div style={{ padding: '20px', backgroundColor: 'white' }}>
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
            </div>
        </Modal>
        {/* Modal Update */}
        <Modal
            open={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey' }} 
        >
        <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'white',
            }}>
                <h2>Update Collection</h2>
                <TextField 
                    label="Title" 
                    variant="outlined" 
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <TextField 
                    label="Description"
                    variant="outlined"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                />
                <Button variant="contained" onClick={handleConfirmUpdate}>Update</Button>
                <Button variant="contained" onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
            </Box>
            </div>
        </Modal>
        </List>
    </>
    )
}

export default CollectionList
