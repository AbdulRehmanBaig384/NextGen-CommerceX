import React, { useEffect } from 'react'
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite,removeFromFavorites,setFavourites } from '../../redux/featured/favourites/FavouriteSlice'
import { addFavouriteFromlocalStorage,removeFavouriteFromLocalStorage,getFavouritesFromLocalStorage } from '../../utils/localStorage'
import Product from './Product'
const HeartIcon = ({product}) => {
    const dispatch=useDispatch()
    const favorites=useSelector(state=>state.favorites)|| []
    const isfavorites=favorites.some((p)=>p._id===product._id)

    useEffect(()=>{
        const favouritesFromlocalStorage=getFavouritesFromLocalStorage()
        dispatch(setFavourites(favouritesFromlocalStorage))
    },[])

    const toggleFavourites=()=>{
        if(isfavorites){
            dispatch(removeFromFavorites(product))
            removeFavouriteFromLocalStorage(product._id)
        }else{
            dispatch(addToFavorite(product))
            addFavouriteFromlocalStorage(product)
        }
    }
  return (
    <div onClick={toggleFavourites} className='absolute top-2 right-5 cursor-pointer'>
        {isfavorites ?(
            <FaHeart  className='text-pink-500'/>):(
            <FaRegHeart className='text-pink-500'
    
            />
            )}
        </div>)
      
}
export default HeartIcon
