import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice'; // 1. Import the auth reducer

// A helper function to save state to localStorage
const saveState = (state) => {
  try {
    // Save both cart and auth state
    const cartState = JSON.stringify({ cartItems: state.cart.cartItems });
    const authState = JSON.stringify(state.auth);
    localStorage.setItem('cart', cartState);
    localStorage.setItem('auth', authState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer, // 2. Add the auth reducer to the store
  },
});

// 3. Subscribe to store updates to save state whenever it changes
store.subscribe(() => {
  saveState(store.getState());
});