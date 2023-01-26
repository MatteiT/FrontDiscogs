import { createAsyncThunk } from '@reduxjs/toolkit';

export const createWanted = createAsyncThunk('wanted/createWanted', async (wanted, {rejectWithValue}) => {
    try {
        const response = await axios.post('/api/wanted', wanted);
        return response.data;
    } catch (err) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        } else {
            throw err;
        }
    }
});

export const getWantedById = createAsyncThunk('wanted/getWantedById', async (id, {rejectWithValue}) => {
    try {
        const response = await axios.get(`/api/wanted/${id}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        } else {
            throw err;
        }
    }
});

export const getAllWanteds = createAsyncThunk('wanted/getAllWanteds', async (params, {rejectWithValue}) => {
    try {
        const response = await axios.get('/api/wanted', {params});
        return response.data;
    } catch (err) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        } else {
            throw err;
        }
    }
});

export const updateWanted = createAsyncThunk('wanted/updateWanted', async (wanted, {rejectWithValue}) => {
    try {
        const response = await axios.put(`/api/wanted/${wanted.id}`, wanted);
        return response.data;
    }catch (err) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        } else {
            throw err;
        }
    }
});

export const deleteWanted = createAsyncThunk('wanted/deleteWanted', async (id, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`/api/wanted/$(wanted.id)`);
        return response.data;
    } catch (err) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        } else {
            throw err;
        }
    }
}
);

export const wantedSlice = createSlice({
    name: 'wanted',
    initialState: {
        wanteds: [],
        wanted: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        setWanted: (state, action) => {
            state.wanted = action.payload;
        }
    },
    extraReducers: {
        [createWanted.pending]: (state) => {
            state.status = 'loading';
        },
        [createWanted.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.wanted = action.payload;
        },
        [createWanted.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [getWantedById.pending]: (state) => {
            state.status = 'loading';
        },
        [getWantedById.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.wanted = action.payload;
        },
        [getWantedById.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [getAllWanteds.pending]: (state) => {
            state.status = 'loading';
        },
        [getAllWanteds.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.wanteds = action.payload;
        },
        [getAllWanteds.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [updateWanted.pending]: (state) => {
            state.status = 'loading';
        },
        [updateWanted.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.wanted = action.payload;
        },
        [updateWanted.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [deleteWanted.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteWanted.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.wanted = action.payload;
        },
        [deleteWanted.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const { setWanted } = wantedSlice.actions;

export const { selectAll: selectAllWanteds, selectById: selectWantedById } = wantedAdapter.getSelectors(state => state.wanteds);

export default wantedSlice.reducer;