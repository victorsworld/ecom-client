import React, { useState } from 'react';
import { loginUser } from '../Api/api';
import { setUserToken } from '../Auth/authLocalStorage';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setRefreshToken } = useOutletContext();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setRefreshToken(true);
    const data = {
      email,
      password,
    };
    const loginResult = await loginUser(data);
    if (loginResult.success) {
      setUserToken(loginResult.token);
      setEmail('');
      setPassword('');
      setRefreshToken(false);
      navigate('/home');
    }
  };

  return (
    <div>
    <h2 className='text-red-500'>Login</h2>
    <form
      className="flex flex-col space-y-2 max-w-xl mx-auto px-4"
      onSubmit={handleOnSubmit}>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <label className="py-2 w-1/5 text-right">Email:</label>
        <input
          className="border border-black solid py-2 w-4/5"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-2">
        <label className="py-2 w-1/5 text-right">Password:</label>
        <input
          className="border border-black solid py-2 w-4/5"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-row-reverse ml-2'>
        <button className="border border-black solid py-2 w-4/5 ">Submit</button>
      </div>
    </form>
  </div>
  );
};

export default Login;