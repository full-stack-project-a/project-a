import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/cart/cart.css';
import CartItem from './CartItem';
import { 
    fetchCartItems,
    fetchTotalItemsNumber, 
    fetchCartSubtotal, 
    fetchCartTax, 
    fetchCartTotal, 
    fetchCartDiscount,
    applyDiscountCode, 
    updateCartItemQuantity,
    removeCartItem
} from '../../redux/actions/cartActions';


const CartModal = ({ show, close }) => {

    const { auth, setAuth } = useAppContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, subtotal, tax, total, cartItemsNumber, discount } = useSelector(state => state.shoppingCart);
    const [discountCode, setDiscountCode] = useState('');


    useEffect(() => {
        if (show && auth.isAuthenticated && auth.user && auth.user.userId) {
            dispatch(fetchCartItems(auth.user.userId, auth.token));
            dispatch(fetchTotalItemsNumber(auth.user.userId, auth.token));
            dispatch(fetchCartSubtotal(auth.user.userId, auth.token));
            dispatch(fetchCartTax(auth.user.userId, auth.token));
            dispatch(fetchCartTotal(auth.user.userId, auth.token));
            dispatch(fetchCartDiscount(auth.user.userId, auth.token));
        }
    }, [dispatch, show, auth.isAuthenticated, auth.user, auth.token]);


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

    const handleApplyDiscountCode = () => {
        dispatch(applyDiscountCode(auth.user.userId, discountCode, auth.token));
    };

    const handleIncrementQuantity = (productId) => {
        dispatch(updateCartItemQuantity(auth.user.userId, productId, 1, auth.token));
    };

    const handleDecrementQuantity = (productId) => {
        dispatch(updateCartItemQuantity(auth.user.userId, productId, -1, auth.token));
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeCartItem(auth.user.userId, productId, auth.token));
    };


    if (!show) return null;

    return (
        <>
            <div className="cart-modal" onClick={close}>
                <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="cart-modal-header">
                        <div className="cart-modal-header-label">
                            <h2>Cart </h2>
                            <p>({cartItemsNumber})</p>
                        </div>
                        <span className="cart-modal-close" onClick={close}>&times;</span>
                    </div>

                    {items?.length === 0 ? (
                        <div className="empty-cart">
                            <p className='empty-shopping-cart-text'>The shopping cart is empty</p>
                            <button className="go-shopping-btn" onClick={onGoShopping}>Go Shopping</button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items-list">
                                {items?.map((item, index) => (
                                    <CartItem
                                        key={item._id}
                                        item={item}
                                        incrementQuantity={() => handleIncrementQuantity(item.product._id)}
                                        decrementQuantity={() => handleDecrementQuantity(item.product._id)}
                                        handleRemoveItem={() => handleRemoveItem(item.product._id)}
                                    />
                                ))}
                            </div>

                            <div className="discount-code">
                                <p>Appy Discount Code</p>
                                <div className='apply-discount-code'>
                                    <input type="text" className="discount-input" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="20DOLLAROFF" />
                                    <button onClick={handleApplyDiscountCode}>Apply</button>
                                </div>
                                <span className="horizontal-line"></span>
                            </div>

                            <div className="cart-summary">
                                <div className="cart-summary-item">
                                    <h4>Subtotal</h4>
                                    <h4>${subtotal ? subtotal.toFixed(2) : '0.00'}</h4>
                                </div>
                                <div className="cart-summary-item">
                                    <h4>Tax</h4>
                                    <h4>${tax ? tax.toFixed(2) : '0.00'}</h4>
                                </div>
                                <div className="cart-summary-item">
                                    <h4>Discount</h4>
                                    <h4>-${discount ? discount.toFixed(2) : '0.00'}</h4>
                                </div>
                                <div className="cart-summary-item">
                                    <h4>Estimated total</h4>
                                    <h4>${total ? total.toFixed(2) : '0.00'}</h4>
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