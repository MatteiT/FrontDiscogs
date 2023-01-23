import React from 'react';
import {Box, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Pagination = () => {
const { page } = useSelector((state) => state.app);
const dispatch = useDispatch();

const handleNext = () => {
  dispatch({ type: 'app/setPage', payload: page + 1 });
};

const handlePrev = () => {
  dispatch({ type: 'app/setPage', payload: page - 1 });
};


return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
      <Button variant="contained" onClick={handlePrev} disabled={page === 1}>
        Prev
      </Button>
      <Box sx={{ mx: 2 }}>{page}</Box>
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </Box>
  );
} 

export default Pagination;
