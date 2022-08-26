/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VehiclesContext } from "../../contexts/VehiclesContext";

const VehicleDetail = () => {
  const {
    vehicleState: { vehicles, vehicle },
    getVehicles,
  } = useContext(VehiclesContext);
  const { id } = useParams();
  const [vehicleDetail, setVehicleDetail] = useState([]);

  useEffect(() => {
    getVehicles();
    vehicles.map((vehicle) => {
      if (vehicle._id === id) {
        setVehicleDetail(vehicle);
      }
    });
  }, [id]);

//   console.log(vehicleDetail);
  return (
    <Fragment>
      <div className="container pt-10">
        <div className="col-md-5">
          <div href="#" className="card card-product-grid">
            <a href="#" className="img-wrap">
              {" "}
              <img src={vehicleDetail?.pictureUrl} />{" "}
            </a>

            <div className="flex justify-center">
              <a
                href={`/${vehicleDetail?._id}`}
                className="btn btn-outline-primary max-w-[140px] mb-3"
              >
                Yêu cầu báo giá
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VehicleDetail;
