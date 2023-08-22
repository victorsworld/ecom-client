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
    <div>
      <Link className="flex justify-center" to={'/home'}>
        Eternity Is Now
      </Link>
      {isVerified ? (
        <div className="flex justify-end space-x-5 px-4">
          <Link to={'/order'}>Order History</Link>
          <Link to={'/cart'}>Cart</Link>
          <div>
          {user}
          </div>
          <Link onClick={handleLogout}>Logout</Link>
        </div>
      ) : (
        <span>
          <Link to={'/login'}>Login</Link>{' '}
          <Link to={'/register'}>Register</Link>{' '}
        </span>
      )}
    </div>
  );
};

export default NavBar;
