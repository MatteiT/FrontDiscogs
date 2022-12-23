import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userId : null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload;
        },
        clearCredentials: (state) => {
            state.token = null;
        }
        ,
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    },
});

export const { setCredentials, clearCredentials, setUserId } = authSlice.actions;

export const selectCredentials = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
