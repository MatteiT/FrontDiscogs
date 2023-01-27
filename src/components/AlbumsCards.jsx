import React, { useState } from 'react';
import { Card, CardMedia, Typography, Box, Chip, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../features/app/ModalSlice';
import ClickModal from './ClickModal';
import { useGetAllCollectionsQuery } from '../features/collection/CollectionSlice';
import { Select } from '@mui/material';
import { useEffect } from 'react';
import  addWanted  from '../features/wanted/WantedSlice';



export const AlbumsCards = () => {
const urlDiscogs = 'https://www.discogs.com';

const {albums}  = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleModal = (album) => dispatch(setModal(album));
  const [isLoading, setIsLoading] = useState(false);
  const {data: collections} = useGetAllCollectionsQuery();
  const [selectedCollection, setSelectedCollection] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const {userId} = useSelector(state => state.auth);
  const collectionByUser = collections && collections.filter((collection) => collection.userId === userId);
  

const handleAddToWanted = async (album) => {
    setIsLoading(true);
    try {
      const wanted = {
        user: userId,
        album: album
      }
      await dispatch(addWanted(wanted));
      setSuccess('Album added successfully');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  useEffect (() => {
    if (success || error) {
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  }, [success, error]);


      
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
                          <Button
                            size='small'
                            variant="contained"
                            color="primary"
                            href={`${urlDiscogs}/release/${album.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Discogs
                          </Button>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCollection}
                            label="Collection"
                            onChange={(e) => setSelectedCollection(e.target.value)}
                          >
                            {collectionByUser && collectionByUser.map((collection) => (
                              <option key={collection._id} value={collection._id}>{collection.name}</option>
                            ))}
                          </Select>
                          <Button
                            size='small'
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddToWanted(album, selectedCollection)}
                          >
                            Add to collection
                          </Button>
                    </Box>
              </Card>
            ))}
            <ClickModal />
        </Grid>
  </>
  );
};

export default AlbumsCards;

