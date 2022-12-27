import React, { useState } from 'react';
import { Card, CardMedia, Typography, Box, Chip, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../features/app/ModalSlice';
import ClickModal from './ClickModal';
import {selectCollectionById, useGetAllCollectionsQuery, useUpdateCollectionMutation,useGetCollectionQuery } from '../features/collection/CollectionSlice';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';


export const AlbumsCards = () => {
    const urlDiscogs = 'https://www.discogs.com';
    const {albums}  = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const handleModal = (album) => dispatch(setModal(album));

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [collectionId, setCollectionId] = useState('');
    const [updateCollection] = useUpdateCollectionMutation();
    const {data: collection} = useGetCollectionQuery(collectionId);
    const {data: collections} = useGetAllCollectionsQuery();
    const [selectedCollection, setSelectedCollection] = useState('');

    
    
    const handleSelect = (e) => {
        setSelectedCollection(e.target.value);
        console.log(selectedCollection);
    }

    const handleAddToCollection = (album) => {
        const collection = collections.find((collection) => collection.id === selectedCollection);
        console.log(collection);
        const Wanted = collection.wanted;
        Wanted.push(album);
        const newCollection = {
            ...collection,
            wanted: Wanted
        }
        updateCollection(newCollection);
        navigate(`/collections/${collection.id}`);
    }


      if (isLoading) return 'Loading...';
      if (error) return `An error has occurred: ${error.message}`;

        
    return (
        <>
          <Grid container  justifyContent="center" alignItems="center">
            {albums &&
              albums.map((album) => (
                <Card 
                key={album.id}
                sx={{ 
                  width: 400,
                      height: 500,
                      margin: 1, 
                      padding: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                    }} 
                    > 
                      <CardMedia
                        onClick={() => handleModal(album)}
                        component="img"
                        image={album.cover_image && album.cover_image !== '' ? album.cover_image : 'https://www.discogs.com/images/default-release-cd.png'}
                        alt={album.title}
                        sx={{ width: 300, height: 300 }}
                      />
                      <Typography gutterBottom variant="h5" component="div" align='center'>
                        {album.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center'  }}>
                        {album.genre &&
                            album.genre.map((genre, index) => (
                            <Chip key={index} size="small" label={genre}/>
                            ))}
                        {album.style &&
                            album.style.map((style, index) => (
                            <Chip key={index} size="small" label={style}  />
                            ))}
                      </Box>
                      <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                          <Button variant="contained" size='small'>
                            <a href={`${urlDiscogs}${album.uri}`}target="_blank" rel="noreferrer">view on Discogs</a>
                          </Button>
                          <Button
                            size='small'
                            variant="contained"
                            color="primary"
                            onClick={() => handleModal(album)}
                        >
                            View Details
                        </Button>
                          <br/> 
                            <Select
                              native
                              value={selectedCollection}
                              onChange={handleSelect}
                              inputProps={{
                                name: 'collection',
                                id: 'collection-native-simple',
                              }}
                            >
                              <option aria-label="None" value="" />
                              {collections && collections.map((collection) => (
                                <option key={collection._id} value={collection._id}>{collection.title}</option>
                              ))}
                            </Select>
                            <Button
                              size='small'
                              variant="contained"
                              color="primary"
                              onClick={() => handleAddToCollection(album)}
                          >
                              Add to Collection
                          </Button>
                          <br/>
                          <br/>
                          <Button  variant="contained"  size='small' color="error" >Edit</Button>
                          <Button variant="contained"  size='small' >Delete</Button> 
                      </Box>
                </Card>
              ))}
              <ClickModal />
          </Grid>
    </>
    );
};

export default AlbumsCards;

