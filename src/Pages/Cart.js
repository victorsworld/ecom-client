import React, { useState, useEffect } from 'react';
import {useOutletContext } from "react-router-dom";
import { getCart,} from '../Api/api';
import CartItem from '../Components/CartItem';
import CheckOut from '../Components/CheckOut';
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [subTotal, setSubTotal] = useState(0)
  const [checkout, setCheckOut] = useState(false)
  const { isVerified, } = useOutletContext();
  

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await getCart();
        if (cartResponse.success) {
          setProducts(cartResponse.data.product);
          const math = cartResponse.data.product.reduce((a,b)=>{ 
            return b.price + a
          }, 0)
          console.log(math)
          setSubTotal(math)
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
      {products.length > 0 ? (
        <ul>
          {products.map((item) => {
            return <CartItem item={item} key={item._id} setShouldRefetch={setShouldRefetch} />;
          })}
          <p>subTotal: {subTotal}</p>
          <button onClick={() =>{setCheckOut(true)}}>Checkout</button>
        </ul>
      ) : (
        <h1>Cart Is Empty</h1>
      )}
     {checkout && 
     < CheckOut products={products} setCheckOut={setCheckOut} />
     }
    </div>
  );
};
export default Cart;
