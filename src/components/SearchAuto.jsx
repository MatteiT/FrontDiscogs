import React, { useState } from "react";
import { Box, Grid, Tab, Tabs, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../features/app/AppSlice";



const SearchAuto = ({onChange}) => {
    const { albums } = useSelector((state) => state.app);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(setSelectedTab(newValue));
    };

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
                        options={albums.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                autoFocus={true}
                                placeholder="Search for an album or artist here ..."
                                variant="outlined"
                                onChange={onChange}
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

// const url=`https://api.discogs.com/database/search?q=${search}&token=qALItICfHYUDyaIegejpMxJlRDjVmjxBxfkwgbCi&page=${page}`

export default SearchAuto;
