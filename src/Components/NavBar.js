import React from 'react';
import { Link } from 'react-router-dom';
import { removeUserToken } from '../Auth/authLocalStorage';

const NavBar = ({
  user,
  isVerified,
  setRefreshToken,
  setUser,
  setIsVerified,
}) => {
  const handleLogout = async () => {
    setRefreshToken(true);
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      setRefreshToken(false);
      setUser(null);
      setIsVerified(false);
      console.log('logged out');
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Link to={'/home'}>Home</Link>{' '}
      <Link to={'/cart'}>Cart</Link>{' '}
      {isVerified ? (
        <span>
          {' '}
          {user} {' '}
          <Link onClick={handleLogout}>Logout</Link>
        </span>
      ) : (
        <span>
          <Link to={'/login'}>Login</Link> {' '}
          <Link to={'/register'}>Register</Link> {' '}
          
        </span>
      )}
    </div>
  );
};

export default NavBar;
