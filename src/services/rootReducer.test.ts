import { 
    burgerConstructorReducer, 
    feedsReducer, 
    ingredientsReducer, 
    userReducer 
} from "@slices";
import { rootReducer, RootState } from "./store";

describe('Проверка правильной инициализации rootReducer', () => {
    test('В сторе все названия редьюсеров корректны', () => {
        const initialState = rootReducer(undefined, {type: '@@INIT'});
        const properties: string[] = ['items', 'ingredients', 'feeds', 'user'];

        properties.forEach(prop => {
            expect(initialState).toHaveProperty(prop);
        });
    });

    test('Все редьюсеры правильно комбинируются', () => {
        const expInitialState: RootState = {
            items: burgerConstructorReducer(undefined, {type: '@@INIT'}),
            ingredients: ingredientsReducer(undefined, {type: '@@INIT'}),
            feeds: feedsReducer(undefined, {type: '@@INIT'}),
            user: userReducer(undefined, {type: '@@INIT'})
        };
        const actualInitialState = rootReducer(undefined, {type: '@@INIT'});

        expect(actualInitialState).toEqual(expInitialState);
    });
});