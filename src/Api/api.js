import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
const { getUserToken } = require('../Auth/authLocalStorage');

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/user/register`, userData);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, userData);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const validateUser = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/user/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const addToCart = async (shirtData) => {
  try {
    const token = getUserToken();
    const response = await axios.post(`${baseUrl}/cart/fillcart`, shirtData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export { registerUser, loginUser, addToCart, validateUser };
