import React from 'react';

const CartItem = ({ item, incrementQuantity, decrementQuantity, handleRemoveItem }) => {
    return (
        <div className="cart-item">
            <img src={item.imageUrl} alt={item.name} />

            <div className="cart-item-details">
                <div className='cart-item-name-price'>
                    <h3>{item.product.name}</h3>
                    <p>${item.product.price}</p>
                </div>
                <div className='cart-selector-remove'>
                    <div className="quantity-selector">
                        <button onClick={decrementQuantity}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={incrementQuantity}>+</button>
                    </div>
                    <button className='cart-remove-button' onClick={() => handleRemoveItem(item._id)}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;