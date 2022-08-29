/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import Header from "../layout/Header";
import NavBanner from "../layout/NavBanner";
import SingleVehicle from "../vehicles/SingleVehicle";

const Bulldozers = () => {
  const {
    vehicleState: { vehicles },
    getVehicles,
  } = useContext(VehiclesContext);

  useEffect(() => {
    getVehicles();
  }, []);
  console.log(vehicles);
  return (
    <Fragment>
      <Header></Header>
      <NavBanner></NavBanner>
      <section className="section-name padding-y-sm">
        <div className="container">
          <header className="section-heading">
            <h1 className="section-title text-3xl font-bold text-left">
              Dòng Máy Ủi
            </h1>
            <p className="text-left">
              Máy ủi là khung gầm bánh xích được lắp thêm thiết bị là lưỡi
              ủi.Đây là loại máy thi công theo một chuỗi,san gạt đất bằng bàn
              gạt ủi (ủi đất) san đất trên mặt bằng có sẵn.
            </p>
            <p className="text-left">
              Máy được sử dụng để san ủi đất, đá, hoặc một số vật liệu rời khác,
              phục vụ thi công công trình xây dựng trong công nghiệp, giao
              thông, thủy lợi, nông nghiệp và các công trình phát triển cơ sở hạ
              tầng khác.
            </p>
          </header>
          {/* List of vehicles */}
          <div className="row">
            {vehicles.map((vehicle, index) => {
              if (vehicle.vehicle_type === "Máy Ủi") {
                return (
                  <SingleVehicle key={index} vehicle={vehicle}></SingleVehicle>
                );
              }
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Bulldozers;
