import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constant";

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
               
    })
    }),
    register:builder.mutation({
            query:data=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data,
    })}),
    profile:builder.mutation({
        query:data=>({
          url:`${USERS_URL}/profile`,
          method:'PUT',
          body:data,

        })
    }),

    getUsers:builder.query({
        query:()=>({
          url:USERS_URL,

        }),
        providesTags:['User'],
        keepUnusedDataFor:5,
    }),

    deleteUser:builder.mutation({
    query:userId=>({
        url:`${USERS_URL}/${userId}`,
        method:'DELETE'
    })
    }),
    getUserDetails:builder.query({
        query:(id)=>({
            url:`${USERS_URL}/${id}`
        }),
        keepUnusedDataFor:5}),

        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data,
}),
invalidatesTags:['User']
        })
})})
// `use${Login}Mutation`

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation,useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation}=userApiSlice;

// http://localhost:5000/api/users/auth









// import { apiSlice } from "./apiSlice";
// import { USERS_URL } from "../constant";

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     // Login
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/auth`,
//         method: 'POST',
//         body: data,
//       }),
//     }),

//     // Logout
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: 'POST',
//       }),
//     }),

//     // Register
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}`,
//         method: 'POST',
//         body: data,
//       }),
//     }),

//     // Update Profile
//     profile: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/profile`,
//         method: 'PUT',
//         body: data,
//       }),
//     }),

//     // Get all users (admin)
//     getUsers: builder.query({
//       query: () => ({
//         url: USERS_URL,
//       }),
//       providesTags: ['User'], 
//       keepUnusedDataFor: 5,
//     }),

//     // Delete a user (admin)
//     deleteUser: builder.mutation({
//       query: (userId) => ({
//         url: `${USERS_URL}/${userId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['User'], 
//     }),

//     // Get single user details (admin)
//     getUserDetails: builder.query({
//       query: (id) => ({
//         url: `${USERS_URL}/${id}`,
//       }),
//       providesTags: (result, error, id) => [{ type: 'User', id }],
//       keepUnusedDataFor: 5,
//     }),

//     // Update user details (admin)
//     updateUser: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/${data.userId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: (result, error, { userId }) => [
//         { type: 'User', id: userId },
//         'User',
//       ],
//     }),

//   }),
// });


// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useProfileMutation,
//   useGetUsersQuery,
//   useDeleteUserMutation,
//   useGetUserDetailsQuery,
//   useUpdateUserMutation,
// } = userApiSlice;
