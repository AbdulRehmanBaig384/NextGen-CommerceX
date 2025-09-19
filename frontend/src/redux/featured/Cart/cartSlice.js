import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart";

const initialstate=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):{cartItems:[],shippingAddress:{},payementMethod:"PayPal"};
const cartSlice=createSlice({
    name:'cart',
    initialstate,
    reducers:{  
        addToCart:(state,action)=>{
            const {user ,rating,numReviews,...item}=action.payload;
            const existItem=state.cartItems.find(x=>x._id===item._id);
            if(existItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x);
            }
            else{
                state.cartItems=[...state.cartItems,item]
            }
            return updateCart(state,item)
        },
    removeFromCard:(state,action)=>{
        state.cartItems=state.cartItems.filter(x=>x._id!==action.payload)
    }
   ,saveShippingAddress:(state,action)=>{
    state.shippingAddress=action.payload;
    localStorage.setItem("shippingAddress",JSON.stringify(state.shippingAddress))
   }    
    ,clearCartItems:(state,action)=>{
      state.cartItems=[];
      localStorage.setItem('cart',JSON.stringify(state.cartItems))
    },
    savePaymentMethod:(state,action)=>{
      state.paymentMethod=action.payload;
      localStorage.setItem("paymentMethod",JSON.stringify(state.paymentMethod))
    },
    resetCart:(state)=>(state=initialstate),
    }
})

export const {addToCart,removeFromCard,saveShippingAddress,savePaymentMethod,clearCartItems,resetCart}=cartSlice.actions;
export default cartSlice.reducer;