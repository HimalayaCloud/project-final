/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import Header from "../layout/Header";
import NavBanner from "../layout/NavBanner";
import SingleVehicle from "../vehicles/SingleVehicle";

const Crane = () => {
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
              Dòng Máy Cẩu
            </h1>
            <p className="text-left">
              Máy cẩu (cần cẩu) là một loại máy được cấu tạo bởi dây tời, dây
              cáp và ròng rọc. Có tác dụng để nâng vật nặng ở vị trí thấp tới
              cao hoặc từ cao xuống thấp.
            </p>
            <p className="text-left">
              Máy cẩu (cần cẩu) nói chung là một thiết bị nâng hạ quan trọng
              trong nhiều ngành công nghiệp, xây dựng, giao thông… Máy cẩu có
              xuất xứ từ lâu đời, lúc đầu nó được làm từ gỗ rồi dần được thay
              thế bằng gang, thép và lúc đó chỉ sử dụng ở một phạm vị cố định.
              Qua quá trình sử dụng lâu dần, con người đã nghĩ ra việc chế tạo
              thiết bị máy cẩu, xe cẩu ngay trên một chiếc xe có khả năng di
              chuyển từ nơi này sang nơi khác. Và kể từ đó những chiếc xe tải
              cẩu ra đời.
            </p>
          </header>
          {/* List of vehicles */}
          <div className="row">
            {vehicles.map((vehicle, index) => {
              if (vehicle.vehicle_type === "Máy Cẩu") {
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

export default Crane;
