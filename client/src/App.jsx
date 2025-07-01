import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BraCategory from './pages/categories/BraCategory'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/category/bras' element={<BraCategory/>} />
    </Routes>
  )
}

export default App
