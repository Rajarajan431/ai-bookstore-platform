import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import cartReducer from "./slices/cart.slice";
import orderReducer from "./slices/order.slice";
import analyticsReducer from "./slices/analytics.slice";
import sellerReducer from "./slices/sellerOrderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    analytics: analyticsReducer,
    sellerOrders: sellerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
