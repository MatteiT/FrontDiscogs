import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import { useGetAllCollectionsQuery } from '../features/collection/CollectionSlice';
import { useSelector } from 'react-redux';

function CollectionSelect({ selectedCollection, handleChange }) {
  const { userId } = useSelector(state => state.auth);
  const { data: collections } = useGetAllCollectionsQuery(userId);
  const collectionByUser = collections && collections.filter((collection) => collection.userId === userId);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Collection</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCollection || ""}
        label="Collection"
        onChange={handleChange}
        required
      >
        <option value="" disabled>Select a Collection</option>
        {collectionByUser && collectionByUser.map((collection) => (
          <option key={collection._id} value={collection._id}>{collection.title}</option>
        ))}
      </Select>
    </FormControl>
  )
}

export default CollectionSelect

