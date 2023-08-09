import React, { useState } from 'react';
import { registerUser } from '../Api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const registerResult = await registerUser(data);
    console.log('register', registerResult);
    if (registerResult.success) {
      //reset all the state to empty string
      setEmail('');
      setPassword('');
      //navigate to login
      navigate('/login');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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

export default Register;
