import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddtoCart() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Button
      onClick={handleIncrement}
      variant="contained"
      color="primary"
      startIcon={count > 0 ? <RemoveIcon onClick={handleDecrement} /> : null}
      endIcon={count > 0 ? <AddIcon /> : null}
    >
      {count > 0 ? count : 'Add'}
    </Button>
  );
}

export default AddtoCart;
