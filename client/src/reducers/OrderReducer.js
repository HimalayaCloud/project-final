import {
  ORDERS_LOADED_FAILED,
  ORDERS_LOADED_SUCCESS,
  FIND_ORDER,
  ORDERS_UPDATE_STATUS,
} from "../contexts/constants";

export const orderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDERS_LOADED_SUCCESS:
      return {
        ...state,
        orders: payload,
      };
    case ORDERS_LOADED_FAILED:
      return {
        ...state,
        orders: [],
      };
    case FIND_ORDER:
      return {
        ...state,
        order: payload,
      };
    case ORDERS_UPDATE_STATUS:
      const newOrders = state.vehicles.map((vehicle) => {
        if (vehicle._id === payload._id) {
          console.log(payload);
          return payload;
        } else {
          return vehicle;
        }
      });
      return {
        ...state,
        orders: newOrders,
        vehiclesLoading: false,
      };
    default:
      return state;
  }
};
