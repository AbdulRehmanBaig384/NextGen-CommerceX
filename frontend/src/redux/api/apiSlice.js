import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant.js';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes:['Product'],
  endpoints: (builder) => ({}),
// // });
})

// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:5000/api',
//   prepareHeaders: (headers, { getState }) => {
//     // Get token from your redux state - adjust path as per your store structure
//     const token = getState().auth.user?.token;
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   }
// });

// export const apiSlice = createApi({
//   baseQuery,
//   endpoints: () => ({})
// });
// 