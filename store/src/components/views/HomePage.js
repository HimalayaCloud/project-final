/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import NavBanner from "../layout/NavBanner";
import SingleVehicle from "../vehicles/SingleVehicle";
import Header from "../layout/Header"

const HomePage = () => {
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
            <a href="#" className="btn btn-outline-primary float-right">
              Xem tất cả
            </a>
            <h1 className="section-title text-3xl font-bold">
              Sản phẩm nổi bật
            </h1>
          </header>
          {/* List of vehicles */}
          <div className="row">
            {vehicles.map((vehicle, index) => {
              return (
                <SingleVehicle key={index} vehicle={vehicle}></SingleVehicle>
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
