import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/cart/cart.css';
// import { defaultCartItems } from '../../temp/cartData'
// import { TAX_RATE, DISCOUNT_CODE } from '../../temp/cartConfig';
// import { calculateSubtotal, calculateTax, applyDiscount, calculateCartItemsNumber } from '../../utils/cartUtils';
import CartItem from './CartItem';

const CartModal = ({ show, close, cartData }) => {

    console.log(cartData);

    const BACK_END_API = 'http://localhost:8000/api/v1';
    const TEST_USER_ID = '6577a7f2a4603ab4ef7cbd50';

    const [cartItems, setCartItems] = useState(cartData?.items || []);
    const [discountCode, setDiscountCode] = useState('');
    const [subtotal, setSubtotal] = useState(cartData?.subtotal || 0);
    const [tax, setTax] = useState(cartData?.tax || 0);
    const [discount, setDiscount] = useState(cartData?.discount || 0);
    const [total, setTotal] = useState(cartData?.estimatedTotal || 0);
    const [itemsNumber, setItemsNumber] = useState(cartData?.totalItems || 0);
    const navigate = useNavigate();


    // const applyDiscountCode = async (userId, discountCode) => {
    const applyDiscountCode = async (discountCode) => {
        try {
            console.log("Applying discount code:", discountCode);
            await axios.post(`${BACK_END_API}/cart/${TEST_USER_ID}/discount`, { discountCode });
            // fetchCartData(userId);
            // fetchCartData();
        } catch (error) {
            console.error('Error applying discount code:', error);
        }
    };

    const incrementQuantity = async (productId) => {
        // Find the item and update its quantity
        // const item = cartItems.find(item => item.product._id === productId);
        console.log("handle increment quantity");
        try {
            await axios.put(`${BACK_END_API}/cart/${TEST_USER_ID}/cartItem/${productId}`, { quantity: 1 });
            // fetchCartData(userId);
            // fetchCartData();
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const decrementQuantity = async (productId) => {
        // Find the item and update its quantity
        const item = cartItems.find(item => item.product._id === productId);
        console.log("handle decrement quantity");
        if (item && item.quantity > 1) {
            console.log("handle increment quantity");
            try {
                await axios.put(`${BACK_END_API}/cart/${TEST_USER_ID}/cartItem/${productId}`, { quantity: -1 });
                // fetchCartData(userId);
                // fetchCartData();
            } catch (error) {
                console.error('Error updating cart item:', error);
            }
        }
    };

    const handleRemoveItem = async (productId) => {
        console.log("handle remove item");
        try {
            await axios.delete(`${BACK_END_API}/cart/${TEST_USER_ID}/cartItem/${productId}`);
            // fetchCartData(userId);
            // Filter out the removed item from the cartItems array
            const updatedCartItems = cartItems.filter(item => item.product._id !== productId);

            // Update the cartItems state
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // API call to get cart infor

    const fetchTotalItems = async () => {
        const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/totalItems`);
        setItemsNumber(response.data.totalItems);
    };

    const fetchsubtotal = async () => {
        const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/subtotal`);
        setSubtotal(response.data.subtotal);
    };

    const fetchTax = async () => {
        const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/tax`);
        setTax(response.data.tax);
    };

    const fetchDiscount = async () => {
        const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/discount`);
        setDiscount(response.data.discount);
    }

    const fetchEstimatedTotal = async () => {
        const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/estimatedTotal`);
        setTotal(response.data.estimatedTotal);
    };

    // const fetchCartData = async (userId) => {
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/cartItems`);
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        fetchTotalItems();
        fetchsubtotal();
        fetchTax();
        fetchEstimatedTotal();
        fetchDiscount();
        fetchCartItems();
    }, [cartItems, discount]);


    const onCheckout = () => {
        navigate('/checkout');
        close();
        console.log("Checkout process is going on");
    }

    const onGoShopping = () => {
        navigate('/products');
        close();
        console.log('go shopping process is going on');
    }

    if (!show) return null;

    return (
        <>
            <div className="cart-modal" onClick={close}>
                <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="cart-modal-header">
                        <div className="cart-modal-header-label">
                            <h2>Cart </h2>
                            <p>({itemsNumber})</p>
                        </div>
                        <span className="cart-modal-close" onClick={close}>&times;</span>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p className='empty-shopping-cart-text'>The shopping cart is empty</p>
                            <button className="go-shopping-btn" onClick={onGoShopping}>Go Shopping</button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items-list">
                                {cartItems.map((item, index) => (
                                    <CartItem
                                        key={item._id}
                                        item={item}
                                        incrementQuantity={() => incrementQuantity(item.product._id)}
                                        decrementQuantity={() => decrementQuantity(item.product._id)}
                                        handleRemoveItem={() => handleRemoveItem(item.product._id)}
                                    />
                                ))}
                            </div>

                            <div className="discount-code">
                                <p>Appy Discount Code</p>
                                <div className='apply-discount-code'>
                                    <input type="text" className="discount-input" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="20DOLLAROFF" />
                                    <button onClick={() => applyDiscountCode(discountCode)}>Apply</button>
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

                        </>
                    )}

                </div>
            </div>
        </>

    );
};

export default CartModal;