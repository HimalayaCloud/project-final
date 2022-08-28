import { createContext, useReducer, useState } from "react";
import { orderReducer } from "../reducers/OrderReducer";
import {
  apiUrl,
  ORDERS_LOADED_SUCCESS,
  ORDERS_LOADED_FAILED,
  ORDERS_UPDATE_STATUS,
  FIND_ORDER
} from "./constants";
import axios from "axios";

export const OrdersContext = createContext();

const OrderContextProvider = ({ children }) => {
  // State

  const [orderState, dispatch] = useReducer(orderReducer, {
    order: null,
    orders: [],
  });

  // Get Order

  const getOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/orders`);
      if (response.data.success) {
        dispatch({
          type: ORDERS_LOADED_SUCCESS,
          payload: response.data.orders,
        });
      }
    } catch (error) {
      dispatch({ type: ORDERS_LOADED_FAILED, payload: error.message });
    }
  };
  //   Post context data

  const findOrder = (orderId) => {
    const order = orderState.orders.find(
      (order) => order._id === orderId
    );
    dispatch({ type: FIND_ORDER, payload: order });
  };

  const changeOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await axios.put(`${apiUrl}/orders/${orderId}`, orderStatus)
      if(response.data.success){
        dispatch({
          type: ORDERS_UPDATE_STATUS,
          payload: response.data.orders
        })
      }
    } catch (error) {
      console.log("failed to update order")
    }
  }

  const orderContextData = {
    orderState,
    getOrders,
    findOrder,
    changeOrderStatus,
  };

  return (
    <OrdersContext.Provider value={orderContextData}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrderContextProvider;
