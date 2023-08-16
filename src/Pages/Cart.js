import React, { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from "react-router-dom";
import { getCart } from '../Api/api';
import CartItem from '../Components/CartItem';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [subTotal, setSubTotal] = useState(0)

  const { isVerified, userToken, } = useOutletContext();
  

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await getCart();
        if (cartResponse.success) {
          setProducts(cartResponse.data.product);
          setSubTotal(cartResponse.data.subTotal)
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isVerified ) {
      fetchCart(); 
    }
  }, [isVerified, shouldRefetch]);
  

  return (
    <div>
      <h2>Cart</h2>
      {products.length > 0 ? (<ul>
      {products.map((item) => {
        return <CartItem item={item} key={item._id}
        setShouldRefetch={setShouldRefetch}/>
      })}
      <p>subTotal: {subTotal}</p>
      </ul>): (
        <h1>Cart Is Empty</h1>
      )}
    
    
    </div>
  );
};
export default Cart;
