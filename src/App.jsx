import React from 'react'
import "./App.css"
import { Routes,Route } from 'react-router-dom'
import Checkout from './pages/Checkout'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='app'>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="*" element={<p>404 NOT FOUND</p>}/>
      </Routes>
    </div>
  )
}

export default App