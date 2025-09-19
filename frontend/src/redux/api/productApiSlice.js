import { PRODUCT_URL, UPLOAD_URL} from "../constant.js";
import { apiSlice } from "./apiSlice.js";

export const productApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
          getProduct:builder.query({
            query:({keyword})=>({
             url:`${PRODUCT_URL}`,
             params:{keyword}
            }),
            keepUnusedDataFor:5,
            providesTags:['Product']
          }),
          getProductById:builder.query({
            query:(productId)=>`${PRODUCT_URL}/${productId}`,
            providesTags:(result,error,productId)=>[
                {type:'Product',id:productId}
            ],
    }),
    allProducts:builder.query({
      query:()=>`${PRODUCT_URL}/allProducts`
    }),
    getProductDetails:builder.query({
      query:(productId)=>({
        url:`${PRODUCT_URL}/${productId}`
      })
    ,
    keepUnusedDataFor:5,
          }),

//           createProduct:builder.mutation({
//             query:(productData)=>({
//             url:`${PRODUCT_URL}`,
//             method:'POST',
//             body:productData
//           })
//         ,invalidatesTags:['Product']
//         })

createProduct: builder.mutation({
  query: (formData) => {
    const token = localStorage.getItem('token'); // or use Redux selector
    return {
      url: '/api/products',
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
}),

// ,
        // updateProduct:builder.mutation({
        //    query:({productId,formData})=>({
        //     url:`${PRODUCT_URL}/${productId}`,
        //     method:'PUT',
        //     body:formData,
        //   })
        // }),


        updateProduct: builder.mutation({
  query: ({ productId, productData }) => ({
    url: `${PRODUCT_URL}/${productId}`,
    method: 'PUT',
    body: productData,  
  }),
  invalidatesTags: ['Product'],
}),

        uploadProductImage:builder.mutation({
          query:(data)=>({
            url:`${UPLOAD_URL}`
            ,method:'POST'
            ,body:data,
          })
        }),
        deleteProduct:builder.mutation({
          query:(productId)=>({
            url:`${PRODUCT_URL}/${productId}`,
            method:'DELETE'
          }),
          providesTags:['Product']
        }),
        createReviews:builder.mutation({
          query:(data)=>({
            url:`${PRODUCT_URL}/${data.productId}/reviews`,
            method:'POST',
            body:data
          })
        })
,
        getTopProduct:builder.query({
          query:()=>`${PRODUCT_URL}/top`
          ,keepUnusedDataFor:5,
        }),
        getNewProduct:builder.query({
          query:()=>`${PRODUCT_URL}/new`,
          keepUnusedDataFor:5,
        })
    })})

    export const{useGetProductByIdQuery
      ,useAllProductsQuery,
      useGetProductDetailsQuery,
      useCreateProductMutation,
      useCreateReviewsMutation,
      useDeleteProductMutation,
      useGetTopProductQuery,
      useUpdateProductMutation,
      useGetNewProductQuery,
      useUploadProductImageMutation,
      useGetProductQuery,}=productApiSlice 
  