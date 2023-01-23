import React from 'react';
import { Button, Typography, Box, Chip, Modal, Grid} from '@mui/material';
import { setModal } from '../features/app/modalSlice';
import { useSelector, useDispatch } from 'react-redux';

function ClickModal() {
    const dispatch = useDispatch();
    const { modal } = useSelector((state) => state.modal);
    const handleClose = () => dispatch(setModal(null));

    return (
        <Modal 
        open={modal !== null} 
        onClose={handleClose} 
        >
            <Box sx={{ 
              position: 'absolute', 
              top: '50%', left: '50%', 
              transform: 'translate(-50%, -50%)', 
              bgcolor: 'background.paper', 
              border: '2px solid #000', 
              boxShadow: 24, p: 4 }}
              >
                <Grid container 
                justifyContent="center" 
                alignContent='center' 
                flexDirection='column' 
                alignItems='center' 
                >
                  <Typography variant="h8" component="h2" label='Artiste'>
                    {modal && modal.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                  <h1>  {modal && modal.artists}</h1>
                  </Typography>
                  <Box component='img' src={modal && modal.cover_image} alt={modal && modal.title}   />
                  <Typography variant="h6" color="text.secondary">
                    {modal && modal.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      {modal && modal.label && modal.label.map((label, index) => (
                          <Chip key={index} size="small" label={label} />
                      ))}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {modal && modal.country}
                  </Typography>
                  <Box display='flex' justifyContent='center' alignItems='center' flexDirection='row'>
                          {modal && modal.genre &&
                          modal.genre.map((genre, index) => (
                              <Chip key={index} size="small" label={genre} />
                          ))}
                          {modal && modal.style &&
                          modal.style.map((style, index) => (
                              <Chip key={index} size="small" label={style} />
                          ))}
                  </Box>
                  <Box display='flex' justifyContent='center' alignItems='center' flexDirection='row'>
                      <Button variant="contained" size='small'>
                          <a href={modal && modal.uri} target="_blank" rel="noreferrer">view on Discogs</a>
                      </Button>
                  </Box>
              </Grid>
            </Box>     
        </Modal>
    );
}

export default ClickModal;

