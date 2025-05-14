import { TIngredient } from '@utils-types';
import { 
    fetchIngredients, 
    ingredientsReducer 
} from '@slices';

const mockIngredients: TIngredient[] = require('./ingredients.json');

describe('Проверка редьюсера для ингредиентов', () => {
    describe('Проверка начального состояния', () => {
        test('Начальное состояние при первом вызове', () => {
            expect(ingredientsReducer(
                undefined, 
                { type: 'unknown' }
            )).toEqual(
                {
                    items: [],
                    isLoading: true,
                    error: null
                }
            );
        });
    });

    describe('Проверка асинхронных экшенов для загрузки ингредиентов', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('Обработка pending', () => {
            const state = ingredientsReducer(
                undefined, 
                { type: fetchIngredients.pending.type }
            );
            
            expect(state).toMatchObject({
                isLoading: true,
                error: null
            });
        });

        test('Обработка rejected', () => {
            const state = ingredientsReducer(
                undefined, 
                {
                    type: fetchIngredients.rejected.type,
                    error: { message: '' }
                }  
            );
            
            expect(state).toMatchObject({
                items: [],
                isLoading: false,
                error: ''
            });
        });

        test('Обработка fulfilled', () => {
            const state = ingredientsReducer(
                undefined, 
                {
                    type: fetchIngredients.fulfilled.type,
                    payload: mockIngredients
                }
            );
            
            expect(state).toMatchObject({
                items: mockIngredients,
                isLoading: false,
                error: null
            });
        });
    });

    describe('Проверка extraReducers', () => {
        test('Загрузка при pending', () => {
            const state = ingredientsReducer(
                undefined, 
                { type: fetchIngredients.pending.type }
            );

            expect(state.isLoading).toBe(true);
        });

        test('Ошибка при rejected', () => {
            const errorMessage = '';
            const state = ingredientsReducer(
                undefined, 
                {
                    type: fetchIngredients.rejected.type,
                    error: { message: errorMessage }
                }
            );
            
            expect(state.error).toBe(errorMessage);
            expect(state.isLoading).toBe(false);
            expect(state.items).toEqual([]);
        });

        test('Сохранение ингредиентов и сброс загрузки при fulfilled', () => {
            const state = ingredientsReducer(
                undefined, 
                {
                    type: fetchIngredients.fulfilled.type,
                    payload: mockIngredients
                }
            );
            
            expect(state.items.length).toBe(3);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBeNull();
        });
    });
});