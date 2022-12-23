import React from 'react';
import {useEffect} from 'react';
import { Stack } from '@mui/system';
import { useDispatch, useSelector} from 'react-redux';
import { fetchAlbums, setSearch} from '../features/app/appSlice';
import AlbumsCards from './AlbumsCards';
import Pagination from './Pagination';
import SearchAuto from './SearchAuto';
import { Box } from '@mui/material';


const Search = () => {
  const dispatch = useDispatch();
  const { albums, isLoading, error, search, page, selectedTab } = useSelector((state) => state.app);

  console.log(albums);
  console.log(search);

  useEffect(() => {
    dispatch(fetchAlbums(search, page , selectedTab));
  }, [search, page, selectedTab ]);

  const onChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <>
    <Stack direction="row" alignItems="center" >
      <Box sx={{ flexGrow: 1 }}>
      <SearchAuto onChange={onChange}/>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && error ? <div>{error}</div> : null}
      {!isLoading && !error ? <AlbumsCards/>: null }
      <Pagination  />
      </Box>
    </Stack>
    </>
  );
};

export default Search;






