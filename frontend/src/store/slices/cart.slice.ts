import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState, Cart } from "@/types/cart";
import * as cartApi from "@/lib/cart.api";


const initialState: CartState = {
  cart: null,
  loading: false,
};

export const fetchCart = createAsyncThunk<Cart>(
  "cart/fetch",
  async () => {
    return cartApi.getCart();
  }
);

export const addToCart = createAsyncThunk<Cart, number>(
  "cart/add",
  async (bookId) => {
    return cartApi.addToCart(bookId);
  }
);

export const removeFromCart = createAsyncThunk<Cart, number>(
  "cart/remove",
  async (itemId) => {
    return cartApi.removeFromCart(itemId);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
