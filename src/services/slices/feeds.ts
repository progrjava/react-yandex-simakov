import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  TOrderResponse
} from '../../utils/burger-api';

interface FeedsState {
  orders: Array<TOrder>;
  isLoading: boolean;
  currentOrder: TOrderResponse | null;
  total: number;
  totalToday: number;
  error: string | undefined | null;
}

const initialState: FeedsState = {
  orders: [],
  isLoading: true,
  currentOrder: null,
  total: 0,
  totalToday: 0,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.isLoading = false;
      });
  }
});

export const fetchFeeds = createAsyncThunk('feeds/fetchAll', async () =>
  getFeedsApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'feeds/fetchByNumber',
  async (currentNumber: number) => getOrderByNumberApi(currentNumber)
);

export const feedsReducer = feedsSlice.reducer;
