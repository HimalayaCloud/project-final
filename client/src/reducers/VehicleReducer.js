import {
    ADD_VEHICLE,
    DELETE_VEHICLE,
    FIND_VEHICLE,
    VEHICLES_LOADED_FAILED,
    VEHICLES_LOADED_SUCCESS,
    UPDATE_VEHICLE,
  } from "../contexts/constants";
  
  export const vehicleReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case VEHICLES_LOADED_SUCCESS:
        return {
          ...state,
          vehicles: payload,
          vehiclesLoading: false,
        };
      case VEHICLES_LOADED_FAILED:
        return {
          ...state,
          vehicles: [],
          vehiclesLoading: false,
        };
      case ADD_VEHICLE:
        return {
          ...state,
          vehicles: [...state.vehicles, payload],
        };
      case DELETE_VEHICLE:
        return {
          ...state,
          vehicles: state.vehicles.filter((vehicle) => vehicle._id !== payload),
        };
      case FIND_VEHICLE:
        return {
          ...state,
          vehicle: payload,
        };
      case UPDATE_VEHICLE:
        const newVehicles = state.vehicles.map((vehicle) => {
          if (vehicle._id === payload._id) {
            return payload;
          } else {
            return vehicle;
          }
        });
  
        return {
          ...state,
          vehicles: newVehicles,
        };
      default:
        return state;
    }
  };
  