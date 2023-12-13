import React, { useState, useEffect } from 'react';
import '../../styles/cart/cart.css';
import { defaultCartItems } from '../../temp/cartData'
import { TAX_RATE, DISCOUNT_CODE } from '../../temp/cartConfig';
import { calculateSubtotal, calculateTax, applyDiscount, calculateCartItemsNumber } from '../../utils/cartUtils';
import CartItem from './CartItem';

const CartModal = ({ show, close }) => {

    const [cartItems, setCartItems] = useState(defaultCartItems);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        // Update subtotal, tax, etc. when cartItems change
    }, [cartItems]);

    const incrementQuantity = (itemId) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const decrementQuantity = (itemId) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

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
    const total = (subtotal + tax - discount);
    const itemsNumber = calculateCartItemsNumber(cartItems);


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
                        <p>({itemsNumber})</p>
                    </div>
                    <span className="cart-modal-close" onClick={close}>&times;</span>
                </div>

                <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            incrementQuantity={incrementQuantity}
                            decrementQuantity={decrementQuantity}
                            handleRemoveItem={handleRemoveItem}
                        />
                    ))}
                </div>

                <div className="discount-code">
                    <p>Appy Discount Code</p>
                    <div className='apply-discount-code'>
                        <input type="text" className="discount-input" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="20DOLLAROFF" />
                        <button onClick={handleApplyDiscount}>Apply</button>
                    </div>
                    <span className="horizontal-line"></span>
                </div>



                <div className="cart-summary">
                    <div className="cart-summary-item">
                        <h4>Subtotal</h4>
                        <h4>${subtotal.toFixed(2)}</h4>
                    </div>
                    <div className="cart-summary-item">
                        <h4>Tax</h4>
                        <h4>${tax.toFixed(2)}</h4>
                    </div>
                    <div className="cart-summary-item">
                        <h4>Discount</h4>
                        <h4>-${discount.toFixed(2)}</h4>
                    </div>
                    <div className="cart-summary-item">
                        <h4>Estimated total</h4>
                        <h4>${total.toFixed(2)}</h4>
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