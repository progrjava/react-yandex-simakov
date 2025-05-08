import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectUserState = (state: RootState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state) => state.isAuthenticated
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectUserOrders = createSelector(
  selectUserState,
  (state) => state.orders
);

export const selectLastOrder = createSelector(
  selectUserState,
  (state) => state.lastOrder
);

export const selectIsOrderRequested = createSelector(
  selectUserState,
  (state) => state.isOrderRequested
);
