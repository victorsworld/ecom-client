import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
const { getUserToken } = require('../Auth/authLocalStorage');


const fillOrder = async (shirtData) => {
    try {
      const token = getUserToken();
      const response = await axios.post(`${baseUrl}/order/create-order`, shirtData, {
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
  
  const orderHistory = async () =>{
    try {
      const token = getUserToken();
      const response = await axios.get(`${baseUrl}/order/order-history`,{
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
  }
  // const editFinalProduct = async (id, info) => {
  //   try {
  //     // const token = getUserToken();
  //     const response = await axios.put(`${baseUrl}/admin/edit-final-product/${id}`, info, 
  //     // {
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`,
  //     //   },
  //     // }
  //     );
  //     const data = await response.data;
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     return error.response.data;
  //   }
  // };

export { fillOrder, orderHistory,}