import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectIngredientsState = (state: RootState) => state.ingredients;

export const selectAllIngredients = createSelector(
  selectIngredientsState,
  (state) => state.items
);

export const selectIngredientsLoading = createSelector(
  selectIngredientsState,
  (state) => state.isLoading
);

export const selectIngredientsError = createSelector(
  selectIngredientsState,
  (state) => state.error
);
