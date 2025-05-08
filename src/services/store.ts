import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerConstructorSliceReducer } from './slices/burger-constructor';
import { ingredientsReducer } from './slices/ingredients';
import { feedsReducer } from './slices/feeds';
import { userSliceReducer } from './slices/user';

const rootReducer = combineReducers({
  items: burgerConstructorSliceReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  user: userSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
