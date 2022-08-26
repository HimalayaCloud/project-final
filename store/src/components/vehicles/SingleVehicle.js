/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const SingleVehicle = ({ vehicle }) => {
  return (
    <div className="col-md-3">
      <div href="#" className="card card-product-grid">
        <a href="#" className="img-wrap">
          {" "}
          <img src={vehicle.pictureUrl} />{" "}
        </a>
        <figcaption className="info-wrap">
          <a href="#" className="title">
            {vehicle.vehicle_name}
          </a>
          <div className="price mt-1">
            Hàng nhập từ {vehicle.manufacturer_country}
          </div>
        </figcaption>
        <div className="flex justify-center">
          <a href={`/${vehicle._id}`} className="btn btn-outline-primary max-w-[120px] mb-3">
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleVehicle;
