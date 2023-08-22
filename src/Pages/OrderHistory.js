import React, { useState, useEffect } from 'react';
import { orderHistory } from '../Api/apiorder';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filterValue, setFilterValue] = useState('all');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await orderHistory();
        if (response.success) {
          setOrders(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredOrders = () => {
    if (filterValue === 'all') {
      return orders;
    } else {
      const currentDate = new Date();
      const timeThresholds = {
        lastMonth: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()),
        lastThreeMonths: new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate()),
        lastSixMonths: new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate()),
        lastYear: new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())
      };

      return orders.filter(order => new Date(order.date) >= timeThresholds[filterValue]);
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      <div>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filterValue} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastThreeMonths">Last 3 Months</option>
          <option value="lastSixMonths">Last 6 Months</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
      {filteredOrders().length > 0 ? (
        <ul>
          {filteredOrders().map((order) => (
            <li key={order._id}>
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div>
                <strong>Status:</strong> {order.status}
              </div>
              <div>
                <strong>Date:</strong> {order.date}
              </div>
              <div>
                <strong>Shipping Address:</strong> {order.shippingaddress}
              </div>
              <div>
                <strong>Item:</strong>
                <ul>
                  {order.item.map((item, index) => (
                    <li key={index}>
                      Size: {item.product.size}, Quantity: {item.product.quantity}, Price: ${item.product.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Transaction Amount:</strong> ${order.tran_amount}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>{orders.length === 0 ? 'No orders have been placed at this time.' : 'No orders match the selected filter.'}</p>
      )}
    </div>
  );
};

export default OrderHistory;
