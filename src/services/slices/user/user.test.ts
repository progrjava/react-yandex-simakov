import {
  userReducer,
  updateUser,
  logout,
  fetchUserOrders,
  createOrder,
  changeAuthStatus,
  changeLastOrder,
  fetchUser,
  login,
  register
} from '@slices';
import { TUserResponse, TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';

const initialState = {
  user: {
    email: '',
    name: ''
  },
  isAuthenticated: false,
  isLoading: false,
  orders: [],
  lastOrder: null,
  isOrderRequested: false
};

const mockOrders: TOrder[] = require('../feeds/feeds.json');

const mockNewOrder: TNewOrderResponse = {
  success: true,
  name: 'Новый бургер',
  order: {
    ...mockOrders[0],
    number: 76824
  }
};

const mockUser: TUserResponse = {
  success: true,
  user: {
    email: 'user@example.ru',
    name: 'User'
  }
};

describe('Проверка редьюсера для пользователя', () => {
  describe('Проверка начального состояния', () => {
    test('Начальное состояние при первом вызове', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('Проверка синхронных экшенов', () => {
    test('Изменение статуса аутентификации', () => {
      const state = userReducer(undefined, changeAuthStatus(true));
      expect(state.isAuthenticated).toBe(true);
    });

    test('Изменение последнего заказа', () => {
      const state = userReducer(undefined, changeLastOrder(mockOrders[0]));
      expect(state.lastOrder).toEqual(mockOrders[0]);
    });
  });

  describe('Проверка экшенов аутентификации', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const actions = [fetchUser, login, register, updateUser];
    actions.forEach((action) => {
      describe(`Провека ${action}`, () => {
        test(`Обработка pending`, () => {
          const state = userReducer(undefined, { type: action.pending.type });
          expect(state.isLoading).toBe(true);
        });

        test(`Обработка rejected`, () => {
          const state = userReducer(undefined, { type: action.rejected.type });

          expect(state).toMatchObject({
            isLoading: false,
            isAuthenticated: false
          });
        });

        test(`Обрабока fulfilled`, () => {
          const state = userReducer(undefined, {
            type: action.fulfilled.type,
            payload: mockUser
          });

          expect(state).toMatchObject({
            isLoading: false,
            isAuthenticated: true,
            user: mockUser.user
          });
        });
      });
    });
  });

  describe('Проверка logout', () => {
    test('Обработка pending', () => {
      const state = userReducer(undefined, { type: logout.pending.type });
      expect(state.isLoading).toBe(true);
    });

    test(`Обработка rejected`, () => {
      const state = userReducer(undefined, { type: logout.rejected.type });

      expect(state.isLoading).toBe(false);
    });

    test('Обработка fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        isAuthenticated: true,
        user: mockUser.user
      };

      const state = userReducer(stateWithUser, { type: logout.fulfilled.type });

      expect(state).toMatchObject({
        isLoading: false,
        isAuthenticated: false,
        user: initialState.user
      });
    });
  });

  describe('Проверка fetchUserOrders', () => {
    test('Обработка pending', () => {
      const state = userReducer(undefined, {
        type: fetchUserOrders.pending.type
      });

      expect(state.isLoading).toBe(true);
    });

    test(`Обработка rejected`, () => {
      const state = userReducer(undefined, {
        type: fetchUserOrders.rejected.type
      });

      expect(state.isLoading).toBe(false);
    });

    test('Обработка fulfilled', () => {
      const state = userReducer(undefined, {
        type: fetchUserOrders.fulfilled.type,
        payload: mockOrders
      });

      expect(state).toMatchObject({
        isLoading: false,
        orders: mockOrders
      });
    });
  });

  describe('Проверка createOrder', () => {
    test('Обработка pending', () => {
      const state = userReducer(undefined, { type: createOrder.pending.type });

      expect(state).toMatchObject({
        isLoading: true,
        isOrderRequested: true
      });
    });

    test(`Обработка rejected`, () => {
      const state = userReducer(undefined, { type: createOrder.rejected.type });

      expect(state).toMatchObject({
        isLoading: false,
        isOrderRequested: false
      });
    });

    test('Обработка fulfilled', () => {
      const state = userReducer(undefined, {
        type: createOrder.fulfilled.type,
        payload: mockNewOrder
      });

      expect(state).toMatchObject({
        isLoading: false,
        isOrderRequested: false,
        lastOrder: mockNewOrder.order,
        orders: [mockNewOrder.order]
      });
    });
  });

  describe('Проверка сохранений заказов', () => {
    test('Сохранение заказов при logout', () => {
      const state = userReducer(
        {
          ...initialState,
          orders: mockOrders
        },
        { type: logout.fulfilled.type }
      );

      expect(state.orders).toEqual(mockOrders);
    });

    test('Сохранение последнего заказа при updateUser', () => {
      const state = userReducer(
        {
          ...initialState,
          lastOrder: mockOrders[0]
        },
        {
          type: updateUser.fulfilled.type,
          payload: mockUser
        }
      );

      expect(state.lastOrder).toEqual(mockOrders[0]);
    });
  });
});
