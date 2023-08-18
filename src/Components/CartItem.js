import React, { useState } from 'react';
import { editCart, deleteCartItem } from '../Api/api';

const CartItem = ({ item, setShouldRefetch }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedSize, setEditedSize] = useState(item.size);

  const increaseQuantity = async () => {
    setShouldRefetch(true);
    const quantity = item.quantity + 1; 
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

  const handleDelete = async () => {
    const result = await deleteCartItem(item._id);
    console.log(result);
    if (result.success) {
      setShouldRefetch(true);
    } else {
      console.error();
    }
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

  const sizeOptions = ['small', 'medium', 'large', 'xlarge'];

  return (
    <div className="p-1">
      <h3>{item.name}</h3>
      {editMode ? (
        <div>
          <button onClick={decreaseQuantity}>-</button>
          <span>{item.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
          <select
            value={editedSize}
            onChange={(e) => setEditedSize(e.target.value)}>
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={saveChanges}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <p>Size: {item.size}</p>
          <p>Color: {item.color}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>{' '}
          {/* Added delete button */}
        </div>
      )}
    </div>
  );
};

export default CartItem;
