import { createEntityAdapter} from '@reduxjs/toolkit';
import { apiSlice } from '../ApiSlice'

const albumAdapter = createEntityAdapter(
    {
        selectId:  album =>  album.id,
        sortComparer: (a, b) => a. albumName.localeCompare(b.albumName),
    }
);
const initialState = albumAdapter.getInitialState();

const albumApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAlbums: builder.query({
            query: () => ({
                url: '/albums',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: (response) => {
                return response.data
            }
        }),
        addAlbum: builder.mutation({
            query: initialAlbum => ({
                url: '/albums',
                method: 'POST',
                body: {
                    ...initialAlbum,
                }
            })
        }),
        deleteAlbum: builder.mutation({
            query: ({ id }) => ({
                url: `/albums/${id}`,
                method: 'DELETE',
                body: { id }
            })
        })
    })
})

export const {
    useGetAlbumsQuery,
    useAddAlbumMutation,
    useDeleteAlbumMutation
} = albumApiSlice

export const {
    selectAll: selectAllAlbums,
    selectById: selectAlbumById,
    selectIds: selectAlbumIds
} = albumAdapter.getSelectors(state => state.albums)

export default albumAdapter.reducer