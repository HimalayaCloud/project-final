import { createContext, useReducer, useEffect, useContext } from "react";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../ultils/setAuthToken";
import { transactionReducer } from "../reducers/TransactionReducer";
export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [transactionState, dispatch] = useReducer(transactionReducer, {
    transactions: [],
  });

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
          payload: { transactions: response.data.transactions },
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

  //   Context Data
  const transactionContextData = {
    getTransaction,
    transactionState,
    updateStatus,
    deleteTransaction
  };

  //   return provider

  return (
    <TransactionContext.Provider value={transactionContextData}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
