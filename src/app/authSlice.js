import { createSlice } from '@reduxjs/toolkit';

// Helper function to load auth state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return { user: null, isAuthenticated: false, wishlist: [] };
    }
    const loadedState = JSON.parse(serializedState);
    // Ensure all keys are present
    return {
      user: loadedState.user || null,
      isAuthenticated: loadedState.isAuthenticated || false,
      wishlist: loadedState.wishlist || [],
    };
  } catch (err) {
    console.error("Could not load auth state from localStorage", err);
    return { user: null, isAuthenticated: false, wishlist: [] };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Optionally clear wishlist on logout, or keep it for when they log back in
      // state.wishlist = []; 
    },
    addToWishlist: (state, action) => {
      const productToAdd = action.payload;
      const exists = state.wishlist.find((item) => item.id === productToAdd.id);
      if (!exists) {
        state.wishlist.push(productToAdd);
      }
    },
    removeFromWishlist: (state, action) => {
      const productIdToRemove = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== productIdToRemove);
    },
  },
});

export const { loginSuccess, logout, addToWishlist, removeFromWishlist } = authSlice.actions;
export default authSlice.reducer;