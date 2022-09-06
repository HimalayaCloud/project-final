import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import { apiUrl, FIND_ORDER, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../ultils/setAuthToken";
import { transactionReducer } from "../reducers/TransactionReducer";
export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [transactionState, dispatch] = useReducer(transactionReducer, {
    transactions: [],
    order_details: [],
    totalAmount: 0,
  });

  const [showModal, setShowModal] = useState(false);

  //   Authenticate guest

  const getTransaction = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/transaction`);
      if (response.data.success) {
        dispatch({
          type: "TRANSACTION_LOADED_SUCCESS",
          payload: response.data.transactions,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenue = async (startDate, endDate) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(
        `${apiUrl}/transaction/revenue?startDate=${startDate}&endDate=${endDate}`
      );
      console.log(response.data,'response ok')
      if (response.data.success) {
        dispatch({
          type: "REVENUE",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (transaction_info) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.put(`${apiUrl}/transaction/update-status/`, {
        transaction_info,
      });
      if (response.data.success) {
        getTransaction();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (transaction_id) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.delete(
        `${apiUrl}/transaction/${transaction_id}`
      );
      if (response.data.success) {
        getTransaction();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findOrderDetails = (transaction_id) => {
    const transactionInfo = transactionState.transactions.find(
      (transaction) => transaction._id === transaction_id
    );
    dispatch({ type: FIND_ORDER, payload: transactionInfo });
  };

  //   Context Data
  const transactionContextData = {
    getTransaction,
    transactionState,
    updateStatus,
    deleteTransaction,
    getRevenue,
    showModal,
    setShowModal,
    findOrderDetails,
  };

  //   return provider

  return (
    <TransactionContext.Provider value={transactionContextData}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
