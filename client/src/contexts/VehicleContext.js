import { createContext, useReducer, useState } from "react";
import { vehicleReducer } from "../reducers/VehicleReducer";
import {
  apiUrl,
  VEHICLES_LOADED_SUCCESS,
  VEHICLES_LOADED_FAILED,
  ADD_VEHICLE,
  DELETE_VEHICLE,
  UPDATE_VEHICLE,
  FIND_VEHICLE,
} from "./constants";
import axios from "axios";

export const VehiclesContext = createContext();

const VehicleContextProvider = ({ children }) => {
  // State
  const [vehicleState, dispatch] = useReducer(vehicleReducer, {
    vehicle: null,
    vehicles: [],
    vehiclesLoading: true,
  });

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showUpdateVehicleModal, setShowUpdateVehicleModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all posts

  const getVehicles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/vehicles`);
      if (response.data.success) {
        dispatch({ type: VEHICLES_LOADED_SUCCESS, payload: response.data.vehicles });
      }
    } catch (error) {
      dispatch({ type: VEHICLES_LOADED_FAILED, payload: error.message });
    }
  };

  // Add post

  const addVehicle = async (newVehicle) => {
    try {
      const response = await axios.post(`${apiUrl}/vehicles`, newVehicle);
      if (response.data.success) {
        dispatch({ type: ADD_VEHICLE, payload: response.data.vehicle_info });
        console.log(response);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Delete Post
  const deleteVehicle = async (vehicleId) => {
    try {
      const response = await axios.delete(`${apiUrl}/vehicles/${vehicleId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_VEHICLE, payload: vehicleId });
        setShowToast({
          show: true,
          message: "Xóa dữ liệu thành công",
          type: response.data.success ? "success" : "danger",
        })
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Find Post on click edit
  const findVehicle = (vehicleId) => {
    const vehicle = vehicleState.vehicles.find((vehicle) => vehicle._id === vehicleId);
    dispatch({ type: FIND_VEHICLE, payload: vehicle });
  };
  // Update Post
  const updateVehicle = async (updatedVehicle) => {
    try {
      const response = await axios.put(
        `${apiUrl}/vehicles/${updatedVehicle._id}`,
        updatedVehicle
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_VEHICLE, payload: response.data.vehicle });
        console.log(response)
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //   Post context data

  const vehicleContextData = {
    vehicleState,
    getVehicles,
    showAddVehicleModal,
    setShowAddVehicleModal,
    addVehicle,
    deleteVehicle,
    updateVehicle,
    findVehicle,
    showToast,
    setShowToast,
    showUpdateVehicleModal,
    setShowUpdateVehicleModal,
  };

  return (
    <VehiclesContext.Provider value={vehicleContextData}>
      {children}
    </VehiclesContext.Provider>
  );
};

export default VehicleContextProvider;
