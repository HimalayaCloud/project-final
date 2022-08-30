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

  const updateCart = async (
    vehicle_id,
    vehicle_name,
    vehicle_price,
    pictureUrl,
    quantity
  ) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.put(`${apiUrl}/cart/update`, {
        vehicle_id,
        vehicle_name,
        vehicle_price,
        pictureUrl,
        quantity,
      });
      if (response.data.success) {
        dispatch({
          type: "CART_UPDATED_SUCCESS",
          payload: { cart: response.data.cart },
        });
      }
      console.log(response, "response update");
    } catch (error) {}
  };

  const updateQuantity = async (cart_products) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.put(`${apiUrl}/cart/update-quantity`, {
        cart_products,
      });
      if (response.data.success) {
        dispatch({
          type: "CART_UPDATED_SUCCESS",
          payload: { cart: response.data.cart },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartProduct = async (vehicle_id) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.put(`${apiUrl}/cart/delete-product`, {
        vehicle_id,
      });
      if (response.data.success) {
        dispatch({
          type: "CART_PRODUCT_DELETE",
          payload: { cart: response.data.cart },
        });
      }
    } catch (error) {}
  };

  //   Context Data
  const cartContextData = {
    cartState,
    getCart,
    updateCart,
    updateQuantity,
    deleteCartProduct,
  };

  //   return provider

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
