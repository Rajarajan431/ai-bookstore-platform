import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnalytics } from "@/lib/analytics.api";
import { Analytics } from "@/types/analytics";

export const fetchAnalytics = createAsyncThunk<
  Analytics,
  void,
  { rejectValue: string }
>(
  "analytics/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAnalytics();
      return res.analytics; // ✅ THIS IS THE FIX
    } catch (err) {
      return rejectWithValue("Failed to fetch analytics");
    }
  }
);


const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    data: null as Analytics | null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // ✅ now clean
      })
      .addCase(fetchAnalytics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default analyticsSlice.reducer;
