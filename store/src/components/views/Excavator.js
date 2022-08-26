/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import NavBanner from "../layout/NavBanner";
import SingleVehicle from "../vehicles/SingleVehicle";

const Excavator = () => {
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
      <NavBanner></NavBanner>
      <section className="section-name padding-y-sm">
        <div className="container">
          <header className="section-heading">
            <h1 className="section-title text-3xl font-bold text-left">
              Dòng Máy Xúc
            </h1>
            <p className="text-left">
              Máy xúc là gì? Hiển nhiên máy xúc là một loại máy móc rồi phải
              không nào. Theo wiki thì máy xúc còn có tên gọi là máy đào, sở dĩ
              người ta gọi như thế vì máy xúc còn có thể đào được đất đá, vật
              liệu… Chính vì nó sử dụng được đa năng cho nên chúng ta nhìn thấy
              máy xúc xuất hiện ở nhiều nơi, trong các công trình xây dựng hay
              trong các khu khai khoáng, trong đời sống người dân, chẳng hạn như
              đào mương, đào cống, đào rãnh, đào ao,…
            </p>
            <p className="text-left">
              Các loại máy xúc thường dùng, phân loại máy xúc Các bạn có thể trả
              lời một cách đơn giản nếu ai hỏi máy xúc là gì? như sau: máy xúc
              là một loại thiết bị hay một loại máy có tác dụng xúc, đào, múc
              các loại vật liệu như đất đá, khoáng sản,… Còn nếu định nghĩa máy
              xúc một cách khoa học thì wiki định nghĩa như sau: “Máy xúc là một
              máy đào cơ giới gồm tay cần, gầu đào và cabin gắn trên mâm quay”
            </p>
          </header>
          {/* List of vehicles */}
          <div className="row">
            {vehicles.map((vehicle, index) => {
              if (vehicle.vehicle_type === "Máy Xúc") {
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

export default Excavator;
