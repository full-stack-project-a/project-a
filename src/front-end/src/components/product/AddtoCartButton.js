import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingButton from '@mui/lab/LoadingButton';
import { addItemToCart } from '../../redux/actions/cartActions';
import { useAppContext } from '../../context/AppContext';
import { fetchCartItemQuantity } from '../../redux/actions/cartActions';

function AddtoCart({ product }) {
  const { auth } = useAppContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // Retrieve the item's quantity from the Redux store
  const count = useSelector(state => {
    const foundItem = state.shoppingCart.items.find(item =>
      item.product && product && item.product._id === product._id
    );
    return foundItem ? foundItem.quantity : 0;
  });

  useEffect(() => {
    if (product && product.productId && count > 0 && auth.isAuthenticated && auth.user && auth.user.userId) {
      dispatch(fetchCartItemQuantity(auth.user.userId, product.productId, auth.token));
    }
    if(product && product.inStockQuantity === 0){
      setIsDisabled(true);
    }
  }, [count, auth.token, auth.user, dispatch, product, auth.isAuthenticated]);

  const handleIncrement = () => {
    if (!auth.isAuthenticated) {
      alert('Please sign in first');
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
    dispatch(addItemToCart(auth.user.userId, product._id, 1, auth.token));
  };

  const handleDecrement = () => {
    if (!auth.isAuthenticated) {
      alert('Please sign in first');
      return;
    }
    if (count > 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
      dispatch(addItemToCart(auth.user.userId, product._id, -1, auth.token));
    }
  };


  if (count === 0) {
    return (
      <LoadingButton
        onClick={handleIncrement}
        loading={loading}
        variant="contained"
        color="primary"
        disabled={isDisabled}
      >
        Add
      </LoadingButton>
    );
  }
  else {
    return (
      <LoadingButton
        // onClick={handleIncrement}
        loading={loading}
        variant="contained"
        color="primary"
        startIcon={ <RemoveIcon onClick={handleDecrement} /> }
        endIcon={ <AddIcon onClick={handleIncrement} /> }
      >
        {count}
      </LoadingButton>
    );
  }
}

export default AddtoCart;
