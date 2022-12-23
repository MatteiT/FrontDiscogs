import { createEntityAdapter} from '@reduxjs/toolkit';
import { apiSlice } from '../ApiSlice'

const artistAdapter = createEntityAdapter(
    {
        selectId: artist => artist.id,
        sortComparer: (a, b) => a.artistName.localeCompare(b.artistName),
    }
);
const initialState = artistAdapter.getInitialState();

const artistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArtists: builder.query({
            query: () => ({
                url: '/artists',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: (response) => {
                return response.data
            }
        }),
        addArtist: builder.mutation({
            query: initialArtist => ({
                url: '/artists',
                method: 'POST',
                body: {
                    ...initialArtist,
                }
            })
        }),
        deleteArtist: builder.mutation({
            query: ({ id }) => ({
                url: `/artists/${id}`,
                method: 'DELETE',
                body: { id }
            })
        })
    })
})

export const {
    useGetArtistsQuery,
    useAddArtistMutation,
    useDeleteArtistMutation
} = artistApiSlice

export const {
    selectAll: selectAllArtists,
    selectById: selectArtistById,
    selectIds: selectArtistIds
} = artistAdapter.getSelectors(state => state.artists)

export default artistAdapter.reducer
