import { createSlice } from '@reduxjs/toolkit';

const wantedSlice = createSlice({
    name: 'wanted',
    initialState: [],
    reducers: {
        addWanted: (state, action) => {
            state.push(action.payload);
        },
        updateWanted: (state, action) => {
            const index = state.findIndex(wanted => wanted._id === action.payload._id);
            state[index] = action.payload;
        },
        deleteWanted: (state, action) => {
            const index = state.findIndex(wanted => wanted._id === action.payload);
            state.splice(index, 1);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(wantedControllers.getAllWanteds.fulfilled, (state, action) => {
                state.push(...action.payload);
            })
            .addCase(wantedControllers.getWantedById.fulfilled, (state, action) => {
                state.push(action.payload);
            });
    }
});

export const { addWanted, updateWanted, deleteWanted } = wantedSlice.actions;

export default wantedSlice.reducer;
