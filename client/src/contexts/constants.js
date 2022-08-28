export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://infinite-dawn-90310.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "access-token";

// VIHICLES

export const VEHICLES_LOADED_SUCCESS = "VEHICLES_LOADED_SUCCESS";
export const VEHICLES_LOADED_FAILED = "VEHICLES_LOADED_FAILED";
export const VEHICLES_LOADING = "VEHICLES_LOADING";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const DELETE_VEHICLE = "DELETE_VEHICLE";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const FIND_VEHICLE = "FIND_VEHICLE";
export const SEARCH_VEHICLE = "SEARCH_VEHICLE";
export const ORDERS_LOADED_SUCCESS = "ORDERS_LOADED_SUCCESS";
export const ORDERS_LOADED_FAILED = "ORDERS_LOADED_FAILED";
export const ORDERS_UPDATE_STATUS = "ORDERS_UPDATE_STATUS";
export const FIND_ORDER = "FIND_ORDER";
