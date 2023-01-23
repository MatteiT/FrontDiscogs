import React from 'react';
import {useEffect} from 'react';
import { Stack } from '@mui/system';
import { useDispatch, useSelector} from 'react-redux';
import { fetchAlbums, setSearch} from '../features/app/appSlice';
import AlbumsCards from './AlbumsCards';
import Pagination from './Pagination';
import SearchAuto from './SearchAuto';
import { Box, CircularProgress } from '@mui/material';


const Search = () => {
  const dispatch = useDispatch();
  const { albums, isLoading, error, search, page, selectedTab } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchAlbums(search, page , selectedTab));
  }, [search, page, selectedTab ]);

  const onChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

return (
    <>
        <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
                <SearchAuto onChange={onChange} />
                {isLoading && <CircularProgress />}
                {error && <div>{error}</div>}
                {!isLoading && !error && albums.length > 0 && <AlbumsCards albums={albums} />}
                {!isLoading && !error && albums.length === 0 && <div>No results found</div>}
                <Pagination />
            </Box>
        </Stack>
    </>
);
}


export default Search;