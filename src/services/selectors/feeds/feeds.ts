import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectFeedsState = (state: RootState) => state.feeds;

export const selectAllOrders = createSelector(
  selectFeedsState,
  (state) => state.orders
);

export const selectOrdersLoading = createSelector(
  selectFeedsState,
  (state) => state.isLoading
);

export const selectOrdersError = createSelector(
  selectFeedsState,
  (state) => state.error
);

export const selectTotalOrders = createSelector(
  selectFeedsState,
  (state) => state.total
);

export const selectTodayOrders = createSelector(
  selectFeedsState,
  (state) => state.totalToday
);

export const selectCurrentOrder = createSelector(
  selectFeedsState,
  (state) => state.currentOrder?.orders[0]
);

export const selectIsOrderFound = createSelector(
  selectFeedsState,
  (state) => state.currentOrder?.success ?? false
);
