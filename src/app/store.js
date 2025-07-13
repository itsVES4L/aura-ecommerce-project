import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

// A helper function to save state to localStorage
const saveState = (state) => {
  try {

    const serializedState = JSON.stringify({ cartItems: state.cart.cartItems });
    localStorage.setItem('cart', serializedState);
  } catch (err) {   console.error("Could not save cart state to localStorage", err);
  }
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});


store.subscribe(() => {
  saveState(store.getState());
});