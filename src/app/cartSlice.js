import { createSlice } from '@reduxjs/toolkit';

// A helper function to load the cart state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      // Return the initial state if nothing is in localStorage
      return { cartItems: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // Return the initial state in case of any errors
    console.error("Could not load cart state from localStorage", err);
    return { cartItems: [] };
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // If item already exists, just increase its quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new item with a quantity of 1
        state.cartItems.push({ ...productToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== productIdToRemove);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;