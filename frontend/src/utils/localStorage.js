export const addFavouriteFromlocalStorage =(product)=>{
    const favourites=getFavouritesFromLocalStorage()
    if(!favourites.some((p)=>p._id===product._id)){
        favourites.push(product)
        localStorage.setItem('favourites',JSON.stringify(favourites))
    }
}

export const removeFavouriteFromLocalStorage=(productId)=>{
    const favourites=getFavouritesFromLocalStorage()
    const updatedFavourites=favourites.filter((product)=>product._id !== productId)
    localStorage.setItem('favourites',JSON.stringify(updatedFavourites))

}
export const getFavouritesFromLocalStorage = () => {
    const favourites = localStorage.getItem('favourites');
    if (favourites) {
        return JSON.parse(favourites);
    } else {
        return [];
    }
}