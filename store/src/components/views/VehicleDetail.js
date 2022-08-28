/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import OrderModal from "../vehicles/OrderModal";

const VehicleDetail = () => {
  const {
    vehicleState: { vehicles },
    getVehicles,
  } = useContext(VehiclesContext);
  const { id } = useParams();
  const [vehicleDetail, setVehicleDetail] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showToast,setShowToast] = useState(false)

  const openModal = () => {
    setShowOrderModal(true);
  };

  const closeToast = () => {
      setShowToast(false)
  }

  useEffect(() => {
    getVehicles();
  }, []);

  useEffect(() => {
    vehicles.map((vehicle) => {
      if (vehicle._id === id) {
        setVehicleDetail(vehicle);
      }
    });
  }, [vehicles]);
  return (
    <Fragment>
      <Toast
        show={showToast}
        style={{ position: "fixed", top: "10%", right: "40%", zIndex: "100" }}
        className={`bg-green text-white`}
        onClose={closeToast}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>Cảm ơn quý khách đã gửi thông tin, chúng tôi sẽ sớm liên hệ với quý khách!</strong>
        </Toast.Body>
      </Toast>
      <OrderModal
        showOrderModal={showOrderModal}
        setShowOrderModal={setShowOrderModal}
        setShowToast={setShowToast}
      ></OrderModal>
      <div className="container pt-10">
        <div className="row">
          <div className="col-md-6">
            <div href="#" className="card card-product-grid">
              <a href="#" style={{ height: "450px" }} className="img-wrap">
                <img
                  style={{ height: "450px" }}
                  className="p-[20px]"
                  src={vehicleDetail?.pictureUrl}
                />
              </a>

              <div className="flex justify-center">
                <button
                  onClick={openModal}
                  className="btn btn-outline-primary max-w-[140px] mb-3"
                >
                  Yêu cầu báo giá
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row vehicle-detail-title">
              {vehicleDetail?.vehicle_name}
            </div>
            <div className="row">
              <div className="col-md-3 font-bold text-xl">Hãng sản xuất</div>
              <div className="col-md-9 font-bold text-xl">
                : {vehicleDetail?.manufacturer}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 font-bold text-xl">Giao hàng tại</div>
              <div className="col-md-9 font-bold text-xl">
                : Hà Nội - Hải Phòng - Thành phố Hồ Chí Minh
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 font-bold text-xl">
                Thời gian giao hàng
              </div>
              <div className="col-md-9 font-bold text-xl">: 30-45 ngày</div>
            </div>
            <div className="row">
              <div className="col-md-3 font-bold text-xl">Năm sản xuất</div>
              <div className="col-md-9 font-bold text-xl">
                : {vehicleDetail.manufacturer_year}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 font-bold text-xl">Xuất xứ</div>
              <div className="col-md-9 font-bold text-xl">
                : {vehicleDetail.manufacturer_country}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-3 font-bold text-xl">Model</div>
              <div className="col-md-9 font-bold text-xl">
                : {vehicleDetail.vehicle_model}
              </div>
            </div>
            <div className="row font-normal text-xl  text-[#ea8500] mb-2">
              Hãy liên hệ với VCM GROUP/ MACHINFO.COM để sở hữu được chiếc cẩu
              bánh lốp tốt nhất và được bảo hành và hỗ trợ chuyên nghiệp nhất
            </div>
            <div className="row info-hotline text-white font-bold text-xl">
              Hotline: 0903 476 661
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VehicleDetail;
