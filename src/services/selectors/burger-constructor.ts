import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectConstructorState = (state: RootState) => state.items;

export const selectConstructorBun = createSelector(
  [selectConstructorState],
  (state) => state.bun
);

export const selectConstructorIngredients = createSelector(
  [selectConstructorState],
  (state) => state.ingredients
);
