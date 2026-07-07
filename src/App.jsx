import React from 'react'
import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Checkout from './pages/Checkout'
import Auth from './pages/Auth'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import CardProvider from './context/CartContext'

function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <div className='app'>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<p>404 NOT FOUND</p>} />
          </Routes>
        </div>
      </CardProvider>
    </AuthProvider>
  )
}

export default App