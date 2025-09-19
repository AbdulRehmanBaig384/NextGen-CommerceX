import {createSlice} from '@reduxjs/toolkit'


const favoriteSlice = createSlice({
    name: 'favourite',
    initialState:[],
    reducers:{
        addToFavorite:(state,action)=>{
            if(!state.some((product)=>product._id === action.payload._id)){
                state.push(action.payload)
            }
    },
    removeFromFavorites:(state,action)=>{
        return state.filter((product)=>product._id !== action.payload._id)
    },
     setFavourites:(state,action)=>{
     return action.payload
     }
}})

export const {addToFavorite,removeFromFavorites,setFavourites} = favoriteSlice.actions
export const selectFavoriteProduct=(state)=>state.favorites
export default favoriteSlice.reducer