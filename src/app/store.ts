import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feautures/auth/authSlice';
import todoReducer from '../feautures/todo/todoSlice';
import { apiSlice } from '../feautures/api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
