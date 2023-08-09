import React, { useState } from 'react';
import { addToCart } from '../Api/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [shirt, setShirt] = useState({ color: '', size: '' });

  const navigate = useNavigate();

  const handleColorClick = (newColor) => {
    setShirt((prevShirt) => ({ color: newColor, size: prevShirt.size }));
  };

  const handleSizeClick = (newSize) => {
    setShirt((prevShirt) => ({ color: prevShirt.color, size: newSize }));
  };

  const handleAddToCart = async () => {
    if (shirt.color && shirt.size) {
      try {
        const response = await addToCart(shirt);
        console.log(response);
        navigate('/cart')
      } catch (error) {
        console.error('Error adding to cart:', error.message);
      }
    }
  };

  return (
    <div>
  
        <button className="border border-black border-solid p-1" onClick={() => handleColorClick('black')}>Black</button>
        <button className="border border-black border-solid p-1" onClick={() => handleColorClick('berry')}>Berry</button>
        <button className="border border-black border-solid p-1" onClick={() => handleColorClick('watermelon')}>Watermelon</button>
        <button className="border border-black border-solid p-1" onClick={() => handleColorClick('ice blue')}>Ice Blue</button>
        <button className="border border-black border-solid p-1" onClick={() => handleColorClick('grey')}>Grey</button>

        <div className="">
          <button className="border border-black border-solid p-1" onClick={() => handleSizeClick('small')}>S</button>
          <button className="border border-black border-solid p-1" onClick={() => handleSizeClick('medium')}>M</button>
          <button className="border border-black border-solid p-1" onClick={() => handleSizeClick('large')}>L</button>
          <button className="border border-black border-solid p-1" onClick={() => handleSizeClick('xlarge')}>XL</button>
        </div>
      
      <button onClick={handleAddToCart} className="mt-2">Add to Cart</button>
      <div>
        Selected Color: {shirt.color}
        <br />
        Selected Size: {shirt.size}
      </div>
    </div>

  );
};

export default Home;
