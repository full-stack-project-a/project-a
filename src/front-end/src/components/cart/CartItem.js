import React from 'react';

const CartItem = ({ item, incrementQuantity, decrementQuantity, handleRemoveItem }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-details">
                <div className='cart-item-name-price'>
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                </div>
                <div className='cart-selector-remove'>
                    <div className="quantity-selector">
                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                    <button className='cart-remove-button' onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;