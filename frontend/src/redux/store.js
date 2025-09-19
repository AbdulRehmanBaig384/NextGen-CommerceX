import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authSlice from './featured/auth/authSlice.js'
import favouritesReducer from './featured/favourites/FavouriteSlice.js'
import {getfavouritesFromLocalStorage} from '../utils/localStorage.js'
import cartSliceReducer from './featured/Cart/cartSlice.js'

const initialfavourite=getfavouritesFromLocalStorage() || []
const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice,
        favorites:favouritesReducer,
        cart:cartSliceReducer
    },

    preloadedState:{
      favorites:initialfavourite  
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

setupListeners(store.dispatch);
export default store
