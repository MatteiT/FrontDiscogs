import { createEntityAdapter} from '@reduxjs/toolkit';
import { apiSlice } from '../ApiSlice'

const collectionAdapter = createEntityAdapter(
    {
        selectId: collection => collection.id,
        sortComparer: (a, b) => a.collectionName.localeCompare(b.collectionName),
    }
);

const initialState = collectionAdapter.getInitialState(
    {
        status: 'idle',
        error: null,
    }
);

const collectionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

    getAllCollections: builder.query({
        query: () => '/collections',
        providesTags: [{ type: 'Collections', id: "LIST" }]
    }),

    getCollection: builder.query({
        query: id => `/collections/${id}`,
        providesTags: (result, error, arg) => [
            { type: 'Collections', id: arg.id }
        ]
    }),

    addCollection: builder.mutation({
        query: initialCollection => ({
            url: '/collections',
            method: 'POST',
            body: {
                ...initialCollection 
            }
        }),
        invalidatesTags: [
            { type: 'Collections', id: "LIST" }
        ]
    }),

    updateCollection: builder.mutation({
        query: initialCollection => ({
            url: '/collections',
            method: 'PATCH',
            body: {
                ...initialCollection,
            }
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'Collections', id: arg.id }
        ]
    }),

    deleteCollection: builder.mutation({
        query: id => ({
            url: `/collections/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'Collections', id: arg.id }
        ]
    }),
})
})

export const {
    useGetAllCollectionsQuery,
    useGetCollectionQuery,
    useAddCollectionMutation,
    useUpdateCollectionMutation,
    useDeleteCollectionMutation,
} = collectionApiSlice


export const {
    selectAll: selectAllCollections,
    selectById: selectCollectionById,
    selectIds: selectCollectionIds,
} = collectionAdapter.getSelectors(state => state.collection)

export default collectionApiSlice.reducer
