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
