import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type MoveDirection = 'up' | 'down';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const prepareConstructorIngredient = (
  ingredient: TIngredient
): {
  payload: TConstructorIngredient;
} => ({ payload: { id: nanoid(), ...ingredient } });

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: MoveDirection }>
    ) => {
      const { id, direction } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);

      if (index === -1) return;
      if (direction === 'up' && index <= 0) return;
      if (direction === 'down' && index >= state.ingredients.length - 1) return;

      const [ingredient] = state.ingredients.splice(index, 1);
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      state.ingredients.splice(newIndex, 0, ingredient);
    },
    addIngredient: {
      prepare: prepareConstructorIngredient,
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        ingredient.type === 'bun'
          ? (state.bun = ingredient)
          : state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    reset: (state: BurgerConstructorState) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    }
  }
});

export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
export const { addIngredient, removeIngredient, moveIngredient, reset } =
  burgerConstructorSlice.actions;
