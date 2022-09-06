import { createContext, useReducer, useEffect, useContext } from "react";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../ultils/setAuthToken";
import { transactionReducer } from "../reducers/TransactionReducer";
import { CartContext } from "./CartContext";
export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const { getCart } = useContext(CartContext);
  const [transactionState, dispatch] = useReducer(transactionReducer, {
    transactions: [],
  });

  //   Authenticate guest
  const createTransaction = async (transactionInfo) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.post(`${apiUrl}/transaction`, {
        transactionInfo,
      });
      if (response.data.success) {
        console.log(response.data);
        getCart()
        dispatch({
          type: "TRANSACTION_CREATE_SUCCESS",
          payload: { transactions: response.data.transactions },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/transaction`);
      if (response.data.success) {
        dispatch({
            type: "TRANSACTION_CREATE_SUCCESS",
            payload: { transactions: response.data.transactions },
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Context Data
  const transactionContextData = {
    getTransaction,
    createTransaction,
    transactionState,
  };

  //   return provider

  return (
    <TransactionContext.Provider value={transactionContextData}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
