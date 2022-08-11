/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import NavbarMenu from "../layout/NavbarMenu";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { VehiclesContext } from "../../contexts/VehicleContext";
import SearchBar from "../layout/SearchBar";
import SingleProduct from "../products/SingleProduct";

const ProductPage = () => {
  //   const {
  //     authState: { user: username },
  //   } = useContext(AuthContext);
  // Post Context
  const {
    vehicleState: { vehicle, vehicles },
    getVehicles,
    setShowAddVehicleModal,
  } = useContext(VehiclesContext);

  useEffect(() => {
    getVehicles();
  }, []);
 
  return (
    <>
      <NavbarMenu></NavbarMenu>
      <div className="h-full bg-[whitesmoke] pt-12">
        {/* Thanh SearchBar */}
        <SearchBar></SearchBar>
        {/* Sản phẩm */}
        <div className="w-[1280px] mt-5 mx-auto flex flex-wrap">
          {vehicles.map((vehicle) => {
            return (
              <SingleProduct key={vehicle._id} vehicle={vehicle}></SingleProduct>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
