import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TNewOrderResponse,
  TUserResponse,
  updateUserApi
} from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface UserState {
  user: {
    email: string;
    name: string;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: TOrder[];
  lastOrder: TOrder | null;
  isOrderRequested: boolean;
}

const initialState: UserState = {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLastOrder: (state, action: PayloadAction<TOrder | null>) => {
      state.lastOrder = action.payload;
    },
    changeAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    const handleAuthPending = (state: UserState) => {
      state.isLoading = true;
    };

    const handleAuthRejected = (state: UserState) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    };

    const handleAuthFulfilled = (
      state: UserState,
      action: PayloadAction<TUserResponse>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = action.payload.success;
      state.user = action.payload.user;
    };

    builder
      .addCase(fetchUser.pending, handleAuthPending)
      .addCase(fetchUser.rejected, handleAuthRejected)
      .addCase(fetchUser.fulfilled, handleAuthFulfilled)

      .addCase(login.pending, handleAuthPending)
      .addCase(login.rejected, handleAuthRejected)
      .addCase(login.fulfilled, handleAuthFulfilled)

      .addCase(register.pending, handleAuthPending)
      .addCase(register.rejected, handleAuthRejected)
      .addCase(register.fulfilled, handleAuthFulfilled)

      .addCase(updateUser.pending, handleAuthPending)
      .addCase(updateUser.rejected, handleAuthRejected)
      .addCase(updateUser.fulfilled, handleAuthFulfilled)

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = initialState.user;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isOrderRequested = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.isOrderRequested = false;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orders.unshift(action.payload.order);
          state.isLoading = false;
          state.lastOrder = action.payload.order;
          state.isOrderRequested = false;
        }
      );
  }
});

const fetchUser = createAsyncThunk('user/fetch', getUserApi);
const login = createAsyncThunk('user/login', loginUserApi);
const register = createAsyncThunk('user/register', registerUserApi);
const updateUser = createAsyncThunk('user/update', updateUserApi);
const logout = createAsyncThunk('user/logout', logoutApi);
const fetchUserOrders = createAsyncThunk('user/orders/fetch', getOrdersApi);
const createOrder = createAsyncThunk('user/orders/create', orderBurgerApi);

export {
  fetchUser,
  login,
  register,
  updateUser,
  logout,
  fetchUserOrders,
  createOrder
};
export const { changeAuthStatus, changeLastOrder } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
