import React, { useState } from 'react';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const price = item.price;
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const deleteItem = () => {
  };
  return (
    <div className="p-1">
      <h3>{item.name}</h3>
      <p>Size: {item.size}</p>
      <p>Color: {item.color}</p>
      <p>Quantity: {quantity}</p>
      <button className='p-1' onClick={decreaseQuantity}>-</button> {' '}
      <button onClick={increaseQuantity}>+</button>
      <p>Price: ${price * quantity}</p>

      <button >Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default CartItem;
