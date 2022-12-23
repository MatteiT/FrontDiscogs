
import React from 'react';
import {Box, Button} from '@mui/material';
import { useSelector } from 'react-redux';

const Pagination = () => {

const {page, setPage} = useSelector((state) => state.app);

return (
    <>
      <section className="pagination">
        <Box sx={{ display: 'flex', justifyContent: 'center'}} margin={3} >
          <Button variant="contained" onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Button variant="contained" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Box>
      </section>
    </>
    );
} 

export default Pagination;
