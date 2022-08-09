import React, { useContext, useEffect } from "react";
import NavbarMenu from "../layout/NavbarMenu";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { VehiclesContext } from "../../contexts/VehicleContext";
import AddVehicleModal from "../vehicles/AddVehicleModal";
import { Table, Toast } from "react-bootstrap";
import UpdateVehicleModal from "../vehicles/UpdateVehicleModal";
import SingleVehicle from "../vehicles/SingleVehicle";
import SearchBar from "../layout/SearchBar";

const HomePage = () => {
  const {
    authState: { user: username },
  } = useContext(AuthContext);
  // Post Context
  const {
    vehicleState: { vehicle, vehicles },
    getVehicles,
    setShowAddVehicleModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(VehiclesContext);

  useEffect(() => {
    getVehicles();
  }, []);
  console.log(vehicles);

  return (
    <>
      <NavbarMenu></NavbarMenu>
      <Toast
        show={show}
        style={{ position: "fixed", top: "10%", right: "40%" }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: "", type: null })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
      <AddVehicleModal />
      {vehicle !== null && <UpdateVehicleModal />}
      <div className="h-screen bg-[whitesmoke] pt-12">
        <SearchBar></SearchBar>
        <div className="w-[1280px] mx-auto flex justify-end">
          <Button
            onClick={() => setShowAddVehicleModal(true)}
            className="bg-[#eb6864] mt-5"
          >
            Thêm sản phẩm
          </Button>
        </div>
        <div className="w-[1280px] overflow-auto max-h-[600px]  mx-auto bg-white rounded relative mt-2">
          <Table style={{ overflowY: "scroll" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>STT</th>
                <th style={{ width: "10%" }}>Hình Ảnh</th>
                <th style={{ width: "30%" }}>Tên Máy</th>
                <th style={{ width: "15%" }}>Giá Máy</th>
                <th style={{ width: "25%" }}>Link GoogleDrive</th>
                <th style={{ width: "15%" }}>Chỉnh Sửa</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => {
                return (
                  <SingleVehicle
                    key={index}
                    index={index}
                    vehicle={vehicle}
                  ></SingleVehicle>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
