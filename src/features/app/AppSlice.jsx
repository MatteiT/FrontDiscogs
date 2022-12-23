import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAlbums = createAsyncThunk('app/fetchAlbums', async (search, page) => {
    const response = await axios.get(`https://api.discogs.com/database/search?q=${search}&token=qALItICfHYUDyaIegejpMxJlRDjVmjxBxfkwgbCi&page=${page}`)
    return response.data.results
})

const appSlice = createSlice({
    name: 'app',
    initialState: {
        search: 'Daft Punk',
        page: 1,
        albums: [],
        hoover: false,
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
        setHoover: (state, action) => {
            state.hoover = action.payload
        },
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
            if(state.selectedTab === 0){
                state.albums = state.albums
            } else if(state.selectedTab === 1){
                state.albums = state.albums.filter(album => album.type === 'artist')
            }else if(state.selectedTab === 2){
                state.albums = state.albums.filter(album => album.type === 'release')
            }else if(state.selectedTab === 3){
                state.albums = state.albums.filter(album => album.type === 'genre')
            }
            
        },
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



export const { setSearch, setPage, setAlbums, setHoover, setSelectedTab } = appSlice.actions
export const appSelector = (state) => state.app
export default appSlice.reducer












