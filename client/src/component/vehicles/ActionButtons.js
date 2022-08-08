import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { VehiclesContext } from "../../contexts/VehicleContext";

const ActionButtons = ({ _id }) => {
  const { deleteVehicle, findVehicle, setShowUpdateVehicleModal } =
    useContext(VehiclesContext);

  const [deleteComfirmModal, setDeleteComfirmModal] = useState(false);

  const chooseVehicle = (vehicleId) => {
    findVehicle(vehicleId);
    setShowUpdateVehicleModal(true);
  };

  return (
    <>
      <Modal
        show={deleteComfirmModal}
        onHide={() => setDeleteComfirmModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa dữ liệu?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteComfirmModal(false)}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              deleteVehicle(_id)
              setDeleteComfirmModal(false)
            }}
            variant="primary"
            type="submit"
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => chooseVehicle(_id)}>Sửa</Button> ||{" "}
      <Button onClick={() => setDeleteComfirmModal(true)}>Xóa</Button>
    </>
  );
};

export default ActionButtons;
