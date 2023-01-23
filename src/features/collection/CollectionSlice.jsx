import { createEntityAdapter} from '@reduxjs/toolkit';
import { apiSlice } from "../ApiSlice"

const collectionAdapter = createEntityAdapter(
    {
        selectId: collection => collection.id,
        sortComparer: (a, b) => a.collectionName.localeCompare(b.collectionName),
    }
);

export const collectionSelectors = collectionAdapter.getSelectors(state => state.collection)


export const collectionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

    getAllCollections: builder.query({
        query: () => '/collections',
        providesTags: (result, error, arg) => [
            { type: 'Collections', id: "LIST" }
        ]
    }),

    
    getCollectionById: builder.query({
        query: id => `/collections/${id}`,
        providesTags: (result, error, arg) => [
            { type: 'Collections', id: arg.id }
        ]
    }),

    addCollection: builder.mutation({
        query: initialCollection => ({
            url: '/collections',
            method: 'POST',
            body: {...initialCollection }
        }),
        invalidatesTags: (results) => { console.log(results) 
            return[
            { type: 'Collections', id: "LIST" }
        ]},
    }),

    updateCollection: builder.mutation({
        query: (id, initialCollection) => ({
            url: `/collections/${id}`,
            method: 'PATCH',
            body: {...initialCollection, id: id}
        }),
        invalidatesTags: (result) => [
            { type: 'Collections', id: result.data.id }
        ]
    }),
    

    deleteCollection: builder.mutation({
        query: id => ({
            url: `/collections/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: (result) => [
            { type: 'Collections', id: result.data.id }
        ]
    }),
})
})

export const {
    useGetAllCollectionsQuery,
    useGetCollectionByIdQuery,
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