import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://dummyjson.com/products';

// Async thunk to fetch products (all, by category, or by search)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, searchTerm }) => {
    let url = API_BASE;
    if (category) {
      url = `${API_BASE}/category/${category}`;
    } else if (searchTerm) {
      url = `${API_BASE}/search?q=${searchTerm}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await fetch(`${API_BASE}/${productId}`);
    return await response.json();
  }
);

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetch(`${API_BASE}/categories`);
    return await response.json();
  }
);

const initialState = {
  items: [],
  categories: [],
  selectedProduct: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.selectedProduct = null; // Clear previous product
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productsSlice.reducer;