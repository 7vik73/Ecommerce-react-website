import React, { useState } from 'react'
import { createContext, useContext } from "react";
import { set } from 'react-hook-form';
import { getProductById } from "../data/products"

const CardContext = createContext(null)

function CardProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    function addToCart(productId) {
        const existingItem = cartItems.find((item) => { return item.id === productId })
        if (existingItem) {
            const currentQuantity = existingItem.quantity
            const updatedCartItems = cartItems.map((item) =>
                item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item
            )
            setCartItems(updatedCartItems)
        } else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }])
        }
    }
    function getCartItemsWithProducts() {
        return cartItems.map((item) => ({
            ...item,
            product: getProductById(item.id)
        })).filter((item) => item.product)
    }
    function removeFromCart(productId) {
        setCartItems(cartItems.filter((item) => item.id !== productId))
    }
    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCartItems(
            cartItems.map((item) => (
                item.id === productId ? { ...item, quantity } : item
            ))
        )
    }
    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id)
            return total + (product ? product.price * item.quantity : 0)
        }, 0)
        return total
    }
    function clearCart(){
        setCartItems([])
        return
    }
    return (
        <CardContext.Provider value={{ cartItems, addToCart, getCartItemsWithProducts, updateQuantity, removeFromCart, getCartTotal,clearCart }}>{children}</CardContext.Provider>
    )
}

export default CardProvider

export function useCart() {
    const context = useContext(CardContext)
    return context
}