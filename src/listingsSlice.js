import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addListing: (state, action) => {
      state.listings.push(action.payload);
    },
    updateListing: (state, action) => {
      const index = state.listings.findIndex(listing => listing.id === action.payload.id);
      if (index !== -1) {
        state.listings[index] = action.payload;
      }
    },
    deleteListing: (state, action) => {
      state.listings = state.listings.filter(listing => listing.id !== action.payload.id);
    },
  },
});

export const { addListing, updateListing, deleteListing } = listingsSlice.actions;

export default listingsSlice.reducer;