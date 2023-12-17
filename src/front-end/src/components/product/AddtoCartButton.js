import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItemToCart } from '../../redux/actions/cartActions';
import { useAppContext } from '../../context/AppContext';
import { fetchCartItemQuantity } from '../../redux/actions/cartActions';

function AddtoCart({ product }) {
  const { auth } = useAppContext();
  const dispatch = useDispatch();

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
  }, [count, auth.token, auth.user, dispatch, product, auth.isAuthenticated]);

  const handleIncrement = () => {
    if (!auth.isAuthenticated) {
      alert('Please sign in first');
      return;
    }
    dispatch(addItemToCart(auth.user.userId, product._id, 1, auth.token));
  };

  const handleDecrement = () => {
    if (!auth.isAuthenticated) {
      alert('Please sign in first');
      return;
    }
    if (count > 0) {
      dispatch(addItemToCart(auth.user.userId, product._id, -1, auth.token));
    }
  };


  if (count === 0) {
    return (
      <Button
        onClick={handleIncrement}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    );
  }
  else {
    return (
      <Button
        // onClick={handleIncrement}
        variant="contained"
        color="primary"
        startIcon={count > 0 ? <RemoveIcon onClick={handleDecrement} /> : null}
        endIcon={count > 0 ? <AddIcon onClick={handleIncrement} /> : null}
      >
        {count}
      </Button>
    );
  }
}

export default AddtoCart;
