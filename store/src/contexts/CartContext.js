import { createContext, useReducer, useEffect } from "react";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../ultils/setAuthToken";
import { cartReducer } from "../reducers/CartReducer";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  //   Authenticate guest
  const getCart = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      }
    try {
      const response = await axios.get(`${apiUrl}/cart`);
      // console.log(response);
      if (response.data.success) {
        dispatch({
          type: "CART_LOADED_SUCCESS",
          payload: { cart: response.data.cart },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCart = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      }
    try {
        const response = await axios.put(`${apiUrl}/cart/update`);
        console.log(response,'response update')
    } catch (error) {
        
    }
  }


  //   Context Data
  const cartContextData = {
    cartState,
    getCart,
    updateCart
  };

  //   return provider

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
