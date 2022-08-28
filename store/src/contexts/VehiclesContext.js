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
  SEARCH_VEHICLE,
  VEHICLES_LOADING,
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

  const [refetch, setRefetch] = useState(false);
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
        dispatch({
          type: VEHICLES_LOADED_SUCCESS,
          payload: response.data.vehicles,
        });
      }
    } catch (error) {
      dispatch({ type: VEHICLES_LOADED_FAILED, payload: error.message });
    }
  };

  // Add post

  const addVehicle = async (newVehicle) => {
    try {
      const response = await axios.post(`${apiUrl}/vehicles`, newVehicle, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (response.data.success) {
        dispatch({ type: ADD_VEHICLE, payload: response.data.vehicle_info });
        console.log(response);
        setRefetch(!refetch);
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
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Find Post on click edit
  const findVehicle = (vehicleId) => {
    const vehicle = vehicleState.vehicles.find(
      (vehicle) => vehicle._id === vehicleId
    );
    dispatch({ type: FIND_VEHICLE, payload: vehicle });
  };
  // Update Post
  const updateVehicle = async (updatedVehicle) => {
    try {
      dispatch({ type: VEHICLES_LOADING });
      const response = await axios.put(
        `${apiUrl}/vehicles/${updatedVehicle._id}`,
        updatedVehicle,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_VEHICLE, payload: response.data.vehicle });
        console.log(response);
        setRefetch(!refetch);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Search Post

  const searchVehicles = async (searchInfo) => {
    try {
      const response = await axios.post(
        `${apiUrl}/vehicles/search`,
        searchInfo
      );
      if (response.data.success) {
        dispatch({
          type: SEARCH_VEHICLE,
          payload: response.data.vehicles,
        });
      }
    } catch (error) {
      dispatch({ type: VEHICLES_LOADED_FAILED, payload: error.message });
    }
  };

  // Add Order

  const createOrder = async (orderInfo) => {
    try {
      const response = await axios.post(`${apiUrl}/orders`, orderInfo);
      if (response.data.success) {
        console.log("Create Order Success");
      }
    } catch (error) {
      console.log("Create Order Failure");
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
    refetch,
    setRefetch,
    showToast,
    createOrder,
    setShowToast,
    showUpdateVehicleModal,
    setShowUpdateVehicleModal,
    searchVehicles,
  };

  return (
    <VehiclesContext.Provider value={vehicleContextData}>
      {children}
    </VehiclesContext.Provider>
  );
};

export default VehicleContextProvider;
