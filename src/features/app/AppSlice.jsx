import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = 'qALItICfHYUDyaIegejpMxJlRDjVmjxBxfkwgbCi'

export const fetchAlbums = createAsyncThunk(
    'app/fetchAlbums', 
    async (search, page) => {
    try{
    const response = await axios.get(`https://api.discogs.com/database/search?q=${search}&token=${API_KEY}&page=${page}`)
    return response.data.results
    } catch (error) {
        throw new Error(`Failed to fetch albums: ${error.message}`)
    }
})

const filterFunctions = {
    0: (album) => true,
    1: (album) => album.type === 'artist',
    2: (album) => album.type === 'release',
    3: (album) => album.type === 'genre',
};

function filterAlbums(albums, selectedTab) {
    return albums.filter(filterFunctions[selectedTab]);
}

const appSlice = createSlice({
    name: 'app',
    initialState: {
        search: 'Daft Punk',
        page: 1,
        albums: [],
        isLoading: false,
        hasErrors: false,
        selectedTab: 0,
    },  
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setAlbums: (state, action) => {
            state.albums = action.payload
        },
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
            state.albums = filterAlbums(state.albums, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasErrors = false
                state.albums = action.payload
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.isLoading = false
                state.hasErrors = true
            })
    }
})

export const { setSearch, setPage, setAlbums, setSelectedTab} = appSlice.actions
export const appSelector = (state) => state.app
export default appSlice.reducer












