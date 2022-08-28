import React, { Fragment, useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { VehiclesContext } from "../../contexts/VehiclesContext";

const OrderModal = ({ showOrderModal, setShowOrderModal, setShowToast }) => {
  const { createOrder } = useContext(VehiclesContext);
  const [order, setOrder] = useState([]);
  const { customer_name, customer_number, customer_email, customer_model } =
    order;
  const onChangeOrderForm = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };
  const closeDialog = () => {
    setShowOrderModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(order);
    const response = await createOrder(order);

    setShowToast(true)

    setShowOrderModal(false)
  };

  return (
    <Fragment>
      <Modal show={showOrderModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>ĐĂNG KÝ NHẬN BÁO GIÁ</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Tên khách hàng"
                name="customer_name"
                value={customer_name}
                onChange={onChangeOrderForm}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="number"
                placeholder="Điện Thoại"
                name="customer_number"
                value={customer_number}
                onChange={onChangeOrderForm}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                placeholder="Email"
                name="customer_email"
                value={customer_email}
                onChange={onChangeOrderForm}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Model muốn tham khảo"
                name="customer_model"
                value={customer_model}
                onChange={onChangeOrderForm}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Gửi Thông Tin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default OrderModal;
