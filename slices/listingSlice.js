import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    addListing: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeListing: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
    },
  },
});

export const { addListing, removeListing } = listingSlice.actions;

export const selectItems = (state) => state.listings.items;

export default listingSlice.reducer;
