import { createContext, useReducer, useEffect } from "react";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../ultils/setAuthToken";
import { guestReducer } from "../reducers/GuestReducer";

export const GuestContext = createContext();

const GuestContextProvider = ({ children }) => {
  const [guestState, dispatch] = useReducer(guestReducer, {
    isAuthenticated: false,
    guest: null,
  });

  //   Authenticate guest
  const loadGuest = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/guest`);
      // console.log(response);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, guest: response.data.guest },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, guest: null },
      });
    }
  };

  useEffect(() => {
    loadGuest();
  }, []);

  //   Login
  const loginGuest = async (loginForm) => {
    try {
      const response = await axios.post(`${apiUrl}/guest/login`, loginForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadGuest();

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  // Register

  const registerGuest = async (guestForm) => {
    try {
      const response = await axios.post(`${apiUrl}/guest/register`, guestForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadGuest();

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  // Logout
  const logoutGuest = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, guest: null },
    });
  };

  //   Context Data
  const guestContextData = {
    loginGuest,
    guestState,
    registerGuest,
    logoutGuest,
  };

  //   return provider

  return (
    <GuestContext.Provider value={guestContextData}>
      {children}
    </GuestContext.Provider>
  );
};

export default GuestContextProvider;
