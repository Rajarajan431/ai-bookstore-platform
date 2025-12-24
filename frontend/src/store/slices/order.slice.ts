import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getMyOrders } from "@/lib/order.api";
import { Order } from "@/types/order";
import { apiFetch } from "@/lib/api";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

/* ======================
   Thunks
====================== */

export const placeOrder = createAsyncThunk(
  "order/place",
  async (items: { bookId: number; quantity: number }[]) => {
    return apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
  }
);



export const fetchMyOrders = createAsyncThunk<
  Order[],        // ✅ return type
  void,           // no argument
  { rejectValue: string }
>("order/fetchMyOrders", async (_, { rejectWithValue }) => {
  try {
    return await getMyOrders();
  } catch (error: any) {
    return rejectWithValue("Failed to fetch orders");
  }
});


/* ======================
   Slice
====================== */

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrders(state) {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
