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

      
    
    </Routes>
  )
}

export default App
