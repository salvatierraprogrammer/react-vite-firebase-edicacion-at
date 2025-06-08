import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../data/base_url';

export const ecApi = createApi({
  reducerPath: "ecApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (builder) => ({
    getFormaciones: builder.query({
      query: () => "formaciones.json",
    }),
    addItem: builder.mutation({
      query: (newItem) => ({
        url: `formaciones.json`,
        method: 'POST',
        body: newItem,
      }),
    }),
   editItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `formaciones/${id}.json`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `formaciones/${updatedItem}.json`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFormacionesQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = ecApi;
