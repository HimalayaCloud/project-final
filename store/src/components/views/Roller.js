/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import Header from "../layout/Header";
import NavBanner from "../layout/NavBanner";
import SingleVehicle from "../vehicles/SingleVehicle";

const Roller = () => {
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
              Dòng Máy Lu
            </h1>
            <p className="text-left">
              Máy lu hay còn gọi là xe lu, xe hủ lô, lu, xe ủi lô là một máy
              được sử dụng để đầm nén đất, cấp phối và vật liệu làm đường, trong
              công việc làm sân, đường, sân bay, đê điều. Nó phục vụ thi công
              các công trình xây dựng trong công nghiệp, giao thông, thủy lợi,
              nông nghiệp và các công trình phát triển cơ sở hạ tầng khác có nhu
              cầu đầm nén.
            </p>
            <p className="text-left">
              Các máy lu thường có một hoặc hai ống trụ và có khối lượng lớn, để
              các ống trụ nén với lực lớn, nhờ vào lực hấp dẫn của Trái Đất, lên
              bề mặt đất đá hay vật liệu; khiến các mảnh vật liệu được tách nhỏ,
              phân phối đều, nén chặt, phẳng mịn. Một số máy có ống trụ rung để
              tác động rải vật liệu hiệu quả.
            </p>
          </header>
          {/* List of vehicles */}
          <div className="row">
            {vehicles.map((vehicle, index) => {
              if (vehicle.vehicle_type === "Máy Lu") {
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

export default Roller;
