import { feedsReducer, fetchFeeds, fetchOrderByNumber } from '@slices';
import { TOrder } from '@utils-types';
import { TFeedsResponse, TOrderResponse, getFeedsApi, getOrderByNumberApi } from '@api';


const mockOrders: TOrder[] = require('./feeds.json');

const mockFeedResponse: TFeedsResponse = {
    success: true,
    orders: mockOrders,
    total: 10000,
    totalToday: 100
};

const mockOrderResponse: TOrderResponse = {
    success: true,
    orders: mockOrders,
};

const initialState = {
    orders: [],
    isLoading: true,
    currentOrder: null,
    total: 0,
    totalToday: 0,
    error: null
};

describe('Проверка редьюсера для ленты заказов', () => {
    describe('Проверка начального состояния', () => {
        test('начальное состояние при первом вызове', () => {
            expect(feedsReducer(
                undefined, 
                { type: 'unknown' }
            )).toEqual(initialState);
        });
    });

    describe('Проверка экшена загрузки ленты заказов', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('Обработка pending', () => {
            const state = feedsReducer(
                undefined, 
                { type: fetchFeeds.pending.type }
            );
            
            expect(state).toEqual(initialState);
        });

        test('Обработка rejected', () => {
            const state = feedsReducer(
                undefined, 
                {
                    type: fetchFeeds.rejected.type,
                    error: { message: '' }
                }
            );
            
            expect(state).toEqual({
                orders: [],
                isLoading: false,
                currentOrder: null,
                total: 0,
                totalToday: 0,
                error: ''
            });
        });

        test('Обработка fulfilled', () => {
            const state = feedsReducer(
                undefined, 
                {
                    type: fetchFeeds.fulfilled.type,
                    payload: mockFeedResponse
                }
            );
            
            expect(state).toEqual({
                orders: mockOrders,
                isLoading: false,
                currentOrder: null,
                total: 10000,
                totalToday: 100,
                error: null
            });
        });
    });

    describe('Проверка загрузки заказа по номеру', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('Обработка pending', () => {
            const state = feedsReducer(
                undefined, 
                { type: fetchOrderByNumber.pending.type }
            );
            
            expect(state).toMatchObject({
                isLoading: true,
                error: null
            });
        });

        test('Обработка rejected', () => {
            const state = feedsReducer(
                undefined, 
                {
                    type: fetchOrderByNumber.rejected.type,
                    error: { message: '' }
                }
            );
            
            expect(state).toMatchObject({
                currentOrder: null,
                isLoading: false,
                error: ''
            });
        });

        test('Обработка fulfilled', () => {
            const state = feedsReducer(
                undefined, 
                {
                    type: fetchOrderByNumber.fulfilled.type,
                    payload: mockOrderResponse
                }
            );
            
            expect(state).toMatchObject({
                currentOrder: mockOrderResponse,
                isLoading: false,
                error: null
            });
        });
    });

    describe('Проверка взаимодействия экшенов', () => {
        test('Сохранение заказа при загрузке ленты', () => {
            const initialStateWithOrder = {
                orders: [],
                isLoading: false,
                currentOrder: mockOrderResponse,
                total: 0,
                totalToday: 0,
                error: null
            };
            const currentOrder= feedsReducer(
                initialStateWithOrder, 
                { type: fetchFeeds.pending.type }
            ).currentOrder;

            expect(currentOrder).toEqual(mockOrderResponse);
        });

        test('Сохранение ленты заказов при загрузке заказа', () => {
            const initialStateWithFeeds = {
                orders: mockOrders,
                isLoading: false,
                currentOrder: null,
                total: 10000,
                totalToday: 100,
                error: null
            };
            const state = feedsReducer(
                initialStateWithFeeds, 
                { type: fetchOrderByNumber.pending.type }
            );

            expect(state.orders).toEqual(mockOrders);
            expect(state.total).toBe(10000);
        });
    });
});