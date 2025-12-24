import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSellerOrders,
  updateOrderItemStatus,
} from "@/lib/order.api";
import { SellerOrderItem } from "@/types/order";

export const fetchSellerOrders = createAsyncThunk<SellerOrderItem[]>(
  "sellerOrders/fetch",
  async () => {
    return await getSellerOrders();
  }
);

export const changeOrderStatus = createAsyncThunk<
  SellerOrderItem,
  { id: number; status: string }
>("sellerOrders/updateStatus", async ({ id, status }) => {
  return await updateOrderItemStatus(id, status);
});

const sellerOrdersSlice = createSlice({
  name: "sellerOrders",
  initialState: {
    orders: [] as SellerOrderItem[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
        }
      });
  },
});

export default sellerOrdersSlice.reducer;
