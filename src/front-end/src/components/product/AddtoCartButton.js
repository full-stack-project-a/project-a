import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItemToCart } from '../../redux/actions/cartActions';
import { useAppContext } from '../../context/AppContext';

function AddtoCart({ product }) {
  const { auth, setAuth } = useAppContext();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user && auth.user.userId && count > 0) {
      // Dispatch addItemToCart each time count changes
      dispatch(addItemToCart(auth.user.userId, product._id, count, auth.token));
    }
  }, [count, auth.isAuthenticated, auth.user, auth.user.userId, dispatch]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  if(count === 0){
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
  else{
    return (
      <Button
        // onClick={handleIncrement}
        variant="contained"
        color="primary"
        startIcon={count > 0 ? <RemoveIcon onClick={handleDecrement} /> : null}
        endIcon={count > 0 ? <AddIcon onClick={handleIncrement}  /> : null}
      >
        {count}
      </Button>
    );
  }
}

export default AddtoCart;
