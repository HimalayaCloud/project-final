import React, { Fragment, useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { VehiclesContext } from "../../contexts/VehicleContext";

const AddVehicleModal = () => {
  //   Context
  const { showAddVehicleModal, setShowAddVehicleModal, addVehicle, setShowToast } =
    useContext(VehiclesContext);

  //   State

  const [newVehicle, setNewVehicle] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newVehicle;

  const onChangeNewVehicleForm = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
  };

  const closeDialog = () => {
    resetAddVehicleData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addVehicle(newVehicle);
    resetAddVehicleData();
    setShowToast({ show: true, message : message, type: success ? "success" : "danger" });
  };

  const resetAddVehicleData = () => {
    setNewVehicle({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddVehicleModal(false);
  };

  return (
    <Fragment>
      <Modal show={showAddVehicleModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={onChangeNewVehicleForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChangeNewVehicleForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Youtube Tutorial URL"
                name="url"
                value={url}
                onChange={onChangeNewVehicleForm}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              LearnIt!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AddVehicleModal;
