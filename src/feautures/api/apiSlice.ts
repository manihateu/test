import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { setAuthData, clearAuthData } from '../auth/authSlice';
import { Todo } from '../todo/todoSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const userId = (api.getState() as RootState).auth.userId;

    if (refreshToken && userId) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { id: userId, refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setAuthData({
          accessToken: refreshResult.data.accessToken,
          refreshToken: refreshResult.data.refreshToken,
          userId: refreshResult.data.user.id,
        }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearAuthData());
      }
    } else {
      api.dispatch(clearAuthData());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: () => ({
        url: '/auth',
        method: 'POST',
        body: {}, 
      }),
    }),
    getTodos: builder.query({
      query: () => '/todo',
    }),
    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/todo',
        method: 'POST',
        body: newTodo,
      }),
    }),
    updateStatus: builder.mutation({
        query: ({id, status}: {id: number, status: Todo['status']}) => ({
            url: `/todo/status/${id}`,
            method: 'PUT',
            body: {status: status},
        })
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/todo/${id}`,
        method: 'PUT',
        body: update,
      }),
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAuthenticateMutation,
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useUpdateStatusMutation
} = apiSlice;
