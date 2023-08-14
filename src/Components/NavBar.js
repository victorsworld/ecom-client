import React from 'react';
import { Link } from 'react-router-dom';
import { removeUserToken } from "../Auth/authLocalStorage"

const NavBar = ({
	user,
	isVerified,
	setRefreshToken,
	setUser,
	setIsVerified,
}) => {
  return (
    <div>
      <Link to={'/home'}>Home</Link> <Link to={'/login'}>Login</Link> <Link to={'/register'}>Register</Link> <Link to={'/cart'}>Cart</Link>
    </div>
  );
};

export default NavBar;
