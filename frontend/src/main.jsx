
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { Route,RouterProvider,createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter } from 'react-router'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Favourites from './pages/Product/Favourites.jsx'
import Product_Details from './pages/Product/Product_Details.jsx'
import Cart from './pages/Cart.js'
import Home from './pages/Home.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route index={true} path='/' element={<Home/>}></Route>
      <Route path='/favourite' element={<Favourites/>}></Route>
      <Route path='/product/:id' element={<Product_Details/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>


      <Route path='' element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      </Route>

     <Route path='admin' element={<AdminRoute/>}>
     <Route path='userlist' element={<UserList/>}/>
     <Route path='categorylist' element={<CategoryList/>}></Route>
     <Route path='allproductslist' element={<AllProducts/>}></Route>
      <Route path='productlist' element={<ProductList/>}></Route>
     <Route path='productlist/:pageNumber' element={<ProductList/>}></Route>
     <Route path='product/update/:_id' element={<ProductUpdate/>}></Route>

     </Route>
      </Route>

    )
)


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route path='login' element={<Login />} />
//       <Route path='register' element={<Register />} />

//       <Route path='' element={<PrivateRoute />}>
//         <Route path='profile' element={<Profile />} />
//       </Route>

//       <Route path='admin' element={<AdminRoute />}>
//         <Route path='userlist' element={<UserList />} />
//         <Route path='categorylist' element={<CategoryList />} />
//       </Route>
//     </Route>
//   )
// )






createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
