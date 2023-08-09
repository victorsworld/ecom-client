import { useState, useEffect } from 'react';
import NavBar from './Components/NavBar';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1> */}

      <Outlet />
    </div>
  );
}

export default App;
