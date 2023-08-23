import React, { useState } from 'react';
import { fillOrder } from '../Api/apiorder'; 
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../Api/api';
import { editFinalProduct } from '../Api/apiorder';

const CheckOut = ({ products, setCheckOut, subTotal, setProducts }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const navigate = useNavigate();

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleShippingAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleBillingAddressChange = (event) => {
    setBillingAddress(event.target.value);
  };
  const handleDeleteCart = async () => {
    try {
      const response = await deleteCart();
      if (response.success) {
        console.log('cart was deleted')
      } else {
        console.log('cart was not deleted')
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleSubmit = async () => {
    const tranAmount = subTotal; 
    const orderData = {
      owner: 'user_id_here', 
      status: 'ordered',
      firstname,
      lastname,
      shippingaddress: shippingAddress,
      billingaddress: billingAddress,
      item: products.map((product) => ({
        product: {
          shirt: product._id,
          size: product.size,
          quantity: product.quantity,
          price: product.price,
        },
      })),
      tran_amount: tranAmount,
    };

    try {
        const response = await fillOrder(orderData);
        if (response.success) {
          // for (const product of products) {
          //   const editProductData = {
          //     size: product.size,
          //     color: product.color,
          //     quantity: -product.quantity, // Subtract the purchased quantity from inventory
          //   };
          //   await editFinalProduct(product._id, editProductData);
          // }
    
          
          handleDeleteCart();
          setCheckOut(false);
          navigate('/order');
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" value={firstname} onChange={handleFirstnameChange} />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text"  value={lastname} onChange={handleLastnameChange} />
      </div>
      <div>
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={handleShippingAddressChange}
        />
      </div>
      <div>
        <label htmlFor="billingAddress">Billing Address:</label>
        <input
          type="text"
          id="billingAddress"
          value={billingAddress}
          onChange={handleBillingAddressChange}
        />
      </div>
      <div><span>SubTotal: {subTotal}</span></div>
      <button onClick={handleSubmit}>Submit Order</button>
      
    </div>
   
  );
};

export default CheckOut;
