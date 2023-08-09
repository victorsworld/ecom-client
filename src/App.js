import { useState, useEffect } from 'react';
import NavBar from './Components/NavBar';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  const [refreshToken, setRefreshToken] = useState(false);
  return (
    <div className="text-center">

      <div className="p-2 border border-black border-solid text-lg font-serif text-neutral-50 bg-black">
        <h3>Welcome To Our Store</h3>
      </div>

      <div className="p-1 border border-black border-solid ">
      <NavBar /> <h1>Eternity is Now</h1>
      </div>

      
      <Outlet context={{ setRefreshToken }} />
    </div>
  );
}

export default App;
