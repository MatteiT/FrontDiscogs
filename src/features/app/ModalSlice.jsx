import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: null,
  },
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setModal} = modalSlice.actions;

export const modalSelector = (state) => state.modal;

export default modalSlice.reducer;
