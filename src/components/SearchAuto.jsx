import React, { useState } from "react";
import { Box, Grid, Tab, Tabs, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSelectedTab } from "../features/app/AppSlice";

const SearchAuto = () => {
    const { albums, selectedTab, search } = useSelector((state) => state.app);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue !== 'all') {
        dispatch(setSelectedTab(newValue));
        }else{
            dispatch(setSelectedTab('all'));
        }
    };
    
    const handleSearch = (e) => {
        const value  = e.target.value;
        dispatch(setSearch(value));
    };

    
    const filteredItems = selectedTab === 'all' ? albums : albums.filter(album => album.type === selectedTab);
    
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid margin={3} justifyContent={"center"} alignItems={"center"} >
                    <Autocomplete
                        id="search_freesolo"
                        freeSolo
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        autoHighlight
                        options={albums.map((album) => album.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                autoFocus={true}
                                variant="outlined"
                                onChange={handleSearch}
                            />
                        )}
                    />
                    <Tabs value={value} onChange={handleChange} >
                        <Tab label="All" name='all' />
                        <Tab label="Artist" name="artist"  />
                        <Tab label="Album" name="album" />
                        <Tab label="Genre"  name="genre" />
                    </Tabs>
                </Grid>
            </Box>
        </>
    );
}


export default SearchAuto;
