import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

// A helper function to save state to localStorage
const saveState = (state) => {
  try {
    // We only want to save the cartItems part of the state
    const serializedState = JSON.stringify({ cartItems: state.cart.cartItems });
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors for now, but you might want to log them
    console.error("Could not save cart state to localStorage", err);
  }
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

// Subscribe to store updates to save the cart state whenever it changes
store.subscribe(() => {
  saveState(store.getState());
});