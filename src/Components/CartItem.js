import React, { useState, useEffect } from 'react';
import { editCart } from '../Api/api';

const CartItem = ({ item, setShouldRefetch }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedSize, setEditedSize] = useState(item.size);



  const increaseQuantity = async () => {
    setShouldRefetch(true);
    const quantity = item.quantity + 1; //= 2
    console.log(quantity);
    const updateditem = { quantity: quantity, price: 20 * quantity };
    await editCart(item.shirtId, updateditem);
    setShouldRefetch(false);
  };

  const decreaseQuantity = async () => {
    setShouldRefetch(true);
    if (item.quantity > 1) {
      const quantity = item.quantity - 1;
      const updateditem = { quantity: quantity, price: 20 * quantity };
      await editCart(item.shirtId, updateditem);
      setShouldRefetch(false);
    }
  };

  const toggleEdit = () => {
    setEditMode(true);
    setEditedSize(item.size);
  };

  const saveChanges = async () => {
    setShouldRefetch(true);

    const updatedItem = {
      size: editedSize,
    };

    await editCart(item.shirtId, updatedItem);
    setShouldRefetch(false);
    setEditMode(false);
  };

  return (
    <div className="p-1">
      <h3>{item.name}</h3>
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedSize}
            onChange={(e) => setEditedSize(e.target.value)}
          />
          <button onClick={saveChanges}>Save</button>
        </div>
      ) : (
        <div>
          <p>Size: {item.size}</p>
          <p>Color: {item.color}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={decreaseQuantity}>-</button>
          <span>{item.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
          <p>Price: ${item.price}</p>
          <button onClick={toggleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
