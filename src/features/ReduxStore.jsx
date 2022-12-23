
import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app/AppSlice'
import theme from './app/themeSlice'
import modalreducer from './app/ModalSlice'
import auth from './auth/authSlice'
import { apiSlice } from './ApiSlice'

const ReduxStore = configureStore({
    reducer: {
        app: appReducer,
        theme,
        modal: modalreducer,
        auth,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default ReduxStore


