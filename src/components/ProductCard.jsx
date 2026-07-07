import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({product}) {
    const {cartItems,addToCart} = useCart()
    const productInCart = cartItems.find((item)=>item.id === product.id)
    const productQuantity = productInCart ? `(${productInCart.quantity})` : ''
    return (
        <div className='product-card'>
            <img src={product.image} alt="Product Img" className='product-card-image' />
            <div className='product-card-content'>
                <h3 className='product-card-name'>{product.name}</h3>
                <p product-card-price>${product.price}</p>
                <div className='product-card-actions'>
                    <Link className='btn btn-secondary' to={`/products/${product.id}`} >View Details</Link>
                    <button className='btn btn-primary' onClick={()=>{
                        addToCart(product.id)
                    }}>Add to Cart {productQuantity}</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard