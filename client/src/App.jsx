import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BraCategory from './pages/categories/BraCategory'
import Cart from './pages/Cart'
import WishList from './pages/WishList'
import Product from './pages/Product'
import Products from './pages/Products'
import Admin from './pages/Admin'
import TestPage from './pages/DomPage'
import AuthPage from './pages/AuthPage'
import "react-toastify/dist/ReactToastify.css"
import BulkReg from './pages/BulkReg'
import UserOrders from './pages/Order'
import ViewOrderPage from './pages/ViewOrderPage'
import NewArrivals from './pages/NewArrivals'
import Brallete from './pages/categories/Brallete'
import GymWears from './pages/categories/GymWears'
import Lingierie from './pages/categories/Lingierie'
import LoungeWear from './pages/categories/LoungeWear'
import Panties from './pages/categories/Panties'
import Sets from './pages/categories/Sets'
import Shorts from './pages/categories/Shorts'
import SleepWears from './pages/categories/SleepWears'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/category/bras' element={<BraCategory/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/wishList' element={<WishList/>} />
      <Route path='/product/:id' element={<Product/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/dom' element={<TestPage/>} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/register" element={<AuthPage mode="register" />} />
    <Route path="/bulk" element={<BulkReg/>} />
    <Route path="/orders" element={<UserOrders/>} />
    <Route path="/orderReciept/:orderId" element={<ViewOrderPage/>} />
    <Route path="/newArrivals" element={<NewArrivals/>} />
    <Route path="/newArrivals" element={<NewArrivals/>} />
    

    <Route path='/category'>
      <Route path='/category/bras' element={<BraCategory/>} />
      <Route path='/category/brallete' element={<Brallete/>} />
      <Route path='/category/gymwear' element={<GymWears/>} />
      <Route path='/category/lingerie' element={<Lingierie/>} />
      <Route path='/category/loungewear' element={<LoungeWear/>} />
      <Route path='/category/panties' element={<Panties/>} />
      <Route path='/category/sets' element={<Sets/>} />
      <Route path='/category/shorts' element={<Shorts/>} />
      <Route path='/category/sleepwear' element={<SleepWears/>} />
    </Route>
    
      
    
    </Routes>
  )
}

export default App
