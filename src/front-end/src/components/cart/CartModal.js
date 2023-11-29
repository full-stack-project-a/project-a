import React, { useState, useEffect } from 'react';
import '../../styles/cart/cart.css'; // Your CSS file for styling
import { defaultCartItems } from '../../temp/cartData'
import { TAX_RATE, DISCOUNT_CODE } from '../../temp/cartConfig';
import { calculateSubtotal, calculateTax, applyDiscount } from '../../utils/cartUtils';


const CartModal = ({ show, initialCartItems, close }) => {

    const [cartItems, setCartItems] = useState(defaultCartItems);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        // Update subtotal, tax, etc. when cartItems change
    }, [cartItems]);

    const handleRemoveItem = (itemId) => {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
    };

    const handleApplyDiscount = () => {
        const discountValue = applyDiscount(discountCode, DISCOUNT_CODE);
        setDiscount(discountValue);
    };

    const subtotal = calculateSubtotal(cartItems);
    const tax = calculateTax(subtotal, TAX_RATE);
    const total = subtotal + tax - discount;

    const removeItem = (itemId) => {
        console.log(`Item with id ${itemId} removed from the cart`);
    };

    const applyDiscount = () => {
        console.log("Apply Discount");
    }

    const onCheckout = () => {
        console.log("Checkout process is going on");
    }

    if (!show) return null;

    return (
        <div className="cart-modal" onClick={close}>
            <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
                <div className="cart-modal-header">
                    <div className="cart-modal-header-label">
                        <h2>Cart </h2>
                        <p>({cartItems.length})</p>
                    </div>
                    <span className="cart-modal-close" onClick={close}>&times;</span>
                </div>

                <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} />

                            <div className="cart-item-details">
                                <div className='cart-item-name-price'>
                                    <h3>{item.name}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <div className='cart-selector-remove'>
                                    <div className="quantity-selector">
                                        <button>-</button>
                                        <span>{item.quantity}</span>
                                        <button>+</button>
                                    </div>
                                    <button className='cart-remove-button' onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="discount-code">
                    <p>Appy Discount Code</p>
                    <div className='apply-discount-code'>
                        <input type="text" className="discount-input" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="20 DOLLAR OFF" />
                        <button onClick={handleApplyDiscount}>Apply</button>
                    </div>
                    <span class="horizontal-line"></span>
                </div>



                <div className="cart-summary">
                    <div className="cart-summary-item">
                        <h4>Subtotal</h4>
                        <h4>${subtotal}</h4>
                    </div>
                    <div className="cart-summary-item">
                        <h4>Tax</h4>
                        <h4>${tax}</h4>
                    </div>
                    <div className="cart-summary-item">
                        <h4>Discount</h4>
                        <h4>-${discount}</h4>
                    </div>
                    <div className="cart-summary-item">
                        <h4>Estimated total</h4>
                        <h4>${subtotal + tax - discount}</h4>
                    </div>
                </div>
                <div className='checkout-btn-container'>
                    <button className="checkout-btn" onClick={onCheckout}>
                        Continue to checkout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CartModal;