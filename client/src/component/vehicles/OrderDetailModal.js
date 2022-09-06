import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { TransactionContext } from "../../contexts/TransactionContext";

const OrderDetailModal = () => {
  const {
    transactionState: { order_details },
    showModal,
    setShowModal,
  } = useContext(TransactionContext);

  console.log(order_details, "here");

  const totalPrice = order_details?.order_details?.reduce((total, order_detail) => {
    return total + order_detail.vehicle_price*order_detail.quantity
  }, 0)

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <h2>Chi tiết hóa đơn</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4  text-lg">Tên khách hàng: </div>
          <div className="col-md-8  text-lg">{order_details.guest_name}</div>
        </div>
        <div className="row">
          <div className="col-md-4  text-lg">Số điện thoại:</div>
          <div className="col-md-8  text-lg">0{order_details.guest_phone}</div>
        </div>
        <div className="row">
          <div className="col-md-4  text-lg">Email: </div>
          <div className="col-md-8  text-lg">{order_details.guest_email}</div>
        </div>
        <div className="row mb-2">
          <div className="col-md-4  text-lg">Địa chỉ: </div>
          <div className="col-md-8  text-lg">{order_details.guest_address}</div>
        </div>
        <div className="row border mx-[1px]"></div>
        <div className="row mt-2">
          <div className="col-md-12 bold text-xl">Danh sách mua</div>
          
        </div>
        {order_details?.order_details?.map((order_detail, index) => {
          return (
            <div key={index} className="row mb-2">
              <div>Tên máy: {order_detail.vehicle_name}</div>
              <div>
                Đơn giá:{" "}
                {order_detail.vehicle_price > 999
                  ? `${order_detail.vehicle_price / 1000} tỷ`
                  : `${order_detail.vehicle_price} triệu`}
              </div>
              <div>Số lượng : {order_detail.quantity}</div>
              <div className="row border mx-[10px] mt-2"></div>
            </div>
          );
        })}
        <div className="text-xl bold">Tổng tiền: {totalPrice>999?`${totalPrice/1000} tỷ`:`${totalPrice} triệu`}</div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailModal;
