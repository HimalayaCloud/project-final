import React from "react";
import NavbarMenu from "../layout/NavbarMenu";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { VehiclesContext } from "../../contexts/VehicleContext";

const HomePage = () => {
  const {
    authState: { user: username },
  } = useContext(AuthContext);
  // Post Context
  const {
    vehicleState: { vehicle, vehicles, vehiclesLoading },
    getVehicles,
    setShowAddVehicleModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(VehiclesContext);

  return (
    <>
      <NavbarMenu></NavbarMenu>
      <div className="h-screen bg-[whitesmoke] pt-12">
        <div className="w-[1280px] h-[134px] mx-auto bg-white rounded flex items-center">
          <div className="w-[900px] mx-auto relative flex">
            <input
              className="bg-[#FABE001A] w-full rounded-full h-[54px] px-3"
              placeholder="SearchBar"
            />
            <Button className="absolute right-4 top-[8px] bg-[#eb6864] border-transparent">
              Tìm Kiếm
            </Button>
          </div>
        </div>
        <div className="w-[1280px] mx-auto bg-white rounded relative mt-20">
          <Button className="absolute right-0 top-[-50px] bg-[#eb6864]">
            Thêm sản phẩm
          </Button>
          hello
        </div>
      </div>
    </>
  );
};

export default HomePage;
