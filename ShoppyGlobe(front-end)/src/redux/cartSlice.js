import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // array of cart items from backend
  },
  reducers: {
    // Add or replace item from backend
    addToCart: (state, action) => {
      const idx = state.items.findIndex(item => item._id === action.payload._id);
      if (idx !== -1) state.items[idx] = action.payload;
      else state.items.push(action.payload);
    },

    increaseQty: (state, action) => {
      const idx = state.items.findIndex(item => item._id === action.payload._id);
      if (idx !== -1) state.items[idx] = action.payload;
    },

    decreaseQty: (state, action) => {
      const idx = state.items.findIndex(item => item._id === action.payload._id);
      if (idx !== -1) state.items[idx] = action.payload;
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
