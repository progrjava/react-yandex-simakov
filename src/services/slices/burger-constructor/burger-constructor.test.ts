import { TIngredient } from '@utils-types';
import {
  addIngredient,
  burgerConstructorReducer,
  moveIngredient,
  removeIngredient,
  reset
} from '@slices';

describe('Проверка редьюсера слайса burgerConstructorSlice', () => {
  const mockBun: TIngredient = {
    _id: '1',
    name: 'Булочка',
    type: 'bun',
    proteins: 4654,
    fat: 1414,
    carbohydrates: 4,
    calories: 0,
    price: 10044,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const mockMain: TIngredient = {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 414,
    fat: 41,
    carbohydrates: 1414,
    calories: 147,
    price: 2040,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  test('Проверка исходного состояния', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  describe('Проверка addIngredient', () => {
    test('Обработка добавления булочки', () => {
      const result = burgerConstructorReducer(
        undefined,
        addIngredient(mockBun)
      );

      expect(result.bun).toEqual({
        id: expect.any(String),
        ...mockBun
      });
      expect(result.ingredients).toEqual([]);
    });

    test('Обработка добавления основного ингредиента', () => {
      const result = burgerConstructorReducer(
        undefined,
        addIngredient(mockMain)
      );

      expect(result.bun).toBeNull();
      expect(result.ingredients).toEqual([
        {
          id: expect.any(String),
          ...mockMain
        }
      ]);
    });
  });

  describe('Проверка removeIngredient', () => {
    test('Удаление ингредиента по id', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { id: '1', ...mockMain },
          { id: '2', ...mockMain }
        ]
      };
      const result = burgerConstructorReducer(
        initialState,
        removeIngredient('1')
      );

      expect(result.ingredients).toEqual([{ id: '2', ...mockMain }]);
    });
  });

  describe('Проверка moveIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { id: '1', ...mockMain },
        { id: '2', ...mockMain },
        { id: '3', ...mockMain },
        { id: '4', ...mockMain },
        { id: '5', ...mockMain }
      ]
    };

    test('Запрет перемещения первого ингредиента вверх', () => {
      const result = burgerConstructorReducer(
        initialState,
        moveIngredient({ id: '1', direction: 'up' })
      );

      expect(result.ingredients).toEqual(initialState.ingredients);
    });

    test('Перемещение ингредиента вверх', () => {
      const result = burgerConstructorReducer(
        initialState,
        moveIngredient({ id: '4', direction: 'up' })
      );

      expect(result.ingredients.map((i) => i.id)).toEqual([
        '1',
        '2',
        '4',
        '3',
        '5'
      ]);
    });

    test('Перемещение ингредиента вниз', () => {
      const result = burgerConstructorReducer(
        initialState,
        moveIngredient({ id: '3', direction: 'down' })
      );

      expect(result.ingredients.map((i) => i.id)).toEqual([
        '1',
        '2',
        '4',
        '3',
        '5'
      ]);
    });

    test('Запрет перемещения последнего ингредиента вниз', () => {
      const result = burgerConstructorReducer(
        initialState,
        moveIngredient({ id: '5', direction: 'down' })
      );

      expect(result.ingredients).toEqual(initialState.ingredients);
    });
  });

  describe('Проверка reset', () => {
    const initialState = {
      bun: { id: '1', ...mockBun },
      ingredients: [
        { id: '2', ...mockMain },
        { id: '3', ...mockMain }
      ]
    };

    test('Обнуление состояния', () => {
      const result = burgerConstructorReducer(initialState, reset());

      expect(result).toEqual({
        bun: null,
        ingredients: []
      });
    });
  });
});
