import React from 'react';
import { Card, CardMedia, Typography, Box, Chip, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../features/app/ModalSlice';
import ClickModal from './ClickModal';


export const AlbumsCards = () => {
    const urlDiscogs = 'https://www.discogs.com';
    const {albums}  = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const handleModal = (album) => dispatch(setModal(album));


    return (
        <>
          <Grid container  justifyContent="center" alignItems="center">
            {albums &&
              albums.map((album) => (
                <Card 
                    onClick={() => handleModal(album)}
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
                        component="img"
                        image={album.cover_image && album.cover_image === '' ? 'https://via.placeholder.com/300' : album.cover_image}
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
                          <Button  variant="contained"  size='small' color="error"  >Add </Button>
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

