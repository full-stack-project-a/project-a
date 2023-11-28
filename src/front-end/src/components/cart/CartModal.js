import React from 'react';
import '../../styles/cart/cart.css'; // Your CSS file for styling
import item1Image from '../../temp/images/Meta-Quest2-VR.png'
import item2Image from '../../temp/images/iWatch.png'

const CartModal = ({ show, cartItems, close, children }) => {
    if (!show) return null;

    cartItems = [
        {
            id: 1,
            name: "Meta Quest2 VR",
            image: item1Image,
            quantity: 1,
            price: 299.00
        },
        {
            id: 2,
            name: "iWatch",
            image: item2Image,
            quantity: 2,
            price: 100.00
        },
    ];

    const removeItem = (itemId) => {
        // Logic to remove the item from the cart
        console.log(`Item with id ${itemId} removed from the cart`);
        // You will need to update the cart state as well, which might be passed down as props or managed via context or Redux
    };

    const applyDiscount = () => {
        console.log("Apply Discount");
    }

    const subtotal = 499.00;
    const tax = 49.90;
    const discount = 20.00;

    const onCheckout = () => {
        console.log("Checkout process is going on");
    }

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
                                    <button className='cart-remove-button' onClick={() => removeItem(item.id)}>Remove</button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="discount-code">
                    <p>Appy Discount Code</p>
                    <div className='apply-discount-code'>
                        <input type="text" className="discount-input" placeholder="20 DOLLAR OFF" />
                        <button onClick={applyDiscount}>Apply</button>
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