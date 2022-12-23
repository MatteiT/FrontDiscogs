import { createSelector, createEntityAdapter} from '@reduxjs/toolkit';
import { apiSlice } from '../ApiSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: () => 'users',
            transformResponse: (response) => response.data,
            providesTags: ['Users'],
        }),
        fetchUserById: builder.query({
            query: (id) => `users/${id}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        addUser: builder.mutation({
            query: (initialUser) => ({
                url: 'users',
                method: 'POST',
                body: initialUser,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: (updatedUser) => ({
                url: `users/${updatedUser.id}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id }],
        }),
    }),
});

export const {
    useFetchUsersQuery,
    useFetchUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersSlice;


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users?? initialState );

export default usersSlice.reducer;
