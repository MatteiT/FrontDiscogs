import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    selectedCollection: '',
    collectionbyUser: [],
    isLoading: false,
    error: null,
    success: null
  },
  reducers: {
    setSelectedCollection: (state, action) => {
      state.selectedCollection = action.payload;
    },
    setCollectionbyUser: (state, {payload}) => {
      state.collectionbyUser = payload.find((collection) => collection.userId === payload.userId);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const { setSelectedCollection, setCollectionbyUser, setLoading,  setError, setSuccess } = collectionSlice.actions;

export default collectionSlice.reducer;


