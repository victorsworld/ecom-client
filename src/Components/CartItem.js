import React, { useState } from 'react';

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);
  
    const price = item.price;
  
    const increaseQuantity = () => {
      setQuantity(quantity + 1);
        // fetch call  to update subtotal and quantity
    };
  
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
      // fetch call  to update subtotal quantity
    };
  
    // Calculate the total price based on the current quantity
    const totalPrice = price * quantity;
  
    return (
      <div>
        <h3>{item.name}</h3>
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        <p>Quantity: {quantity}</p>
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
        <p>Price: ${totalPrice}</p>
        
      </div>
    );
  };
  
  export default CartItem;