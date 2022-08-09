/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { VehiclesContext } from "../../contexts/VehicleContext";

const UpdateVehicleModal = () => {
  //   Context
  const {
    vehicleState: { vehicle },
    showUpdateVehicleModal,
    setShowUpdateVehicleModal,
    updateVehicle,
    setShowToast,
  } = useContext(VehiclesContext);

  //   State

  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);

  useEffect(() => {
    setUpdatedVehicle(vehicle);
  }, [vehicle]);

  const {
    vehicle_type,
    vehicle_branch,
    wheel_type,
    manufacturer,
    manufacturer_country,
    manufacturer_year,
    vehicle_model,
    engine_capacity,
    bucket_capacity,
    vehicle_tonnage,
    hours_worked,
    price,
    vehicle_status,
    description,
    picture,
    driver_link,
  } = updatedVehicle;

  const onChangeUpdateVehicleForm = (event) => {
    setUpdatedVehicle({
      ...updatedVehicle,
      [event.target.name]: event.target.value,
    });
  };

  const vehicleName = `${vehicle_type} ${vehicle_branch} ${wheel_type} ${manufacturer} ${vehicle_model} năm ${manufacturer_year} nhập từ ${manufacturer_country}`;

  useEffect(() => {
    setUpdatedVehicle({ ...updatedVehicle, vehicle_name: vehicleName });
  }, [vehicleName]);

  const closeDialog = () => {
    setUpdatedVehicle(vehicle);
    setShowUpdateVehicleModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setUpdatedVehicle({ ...updatedVehicle, vehicle_name: vehicleName });
    const { success, message } = await updateVehicle(updatedVehicle);
    setShowUpdateVehicleModal(false);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Fragment>
      <Modal show={showUpdateVehicleModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Loại Máy :</Form.Label>
              <Form.Control
                as="select"
                name="vehicle_type"
                required
                value={vehicle_type}
                onChange={onChangeUpdateVehicleForm}
              >
                <option hidden value="" disabled>
                  Chọn loại máy
                </option>
                <option value="Máy Xúc">Máy Xúc</option>
                <option value="Máy Lu">Máy Lu</option>
                <option value="Máy Ủi">Máy Ủi</option>
                <option value="Máy Cẩu">Máy Cẩu</option>
              </Form.Control>
            </Form.Group>
            {vehicle_type === "Máy Xúc" || vehicle_type === "Máy Lu" ? (
              <Form.Group className="mb-2 flex align-center">
                <Form.Label className="mb-0 w-[37%]">Nhánh Máy :</Form.Label>
                <Form.Control
                  as="select"
                  name="vehicle_branch"
                  // required
                  value={vehicle_branch}
                  onChange={onChangeUpdateVehicleForm}
                >
                  <option hidden value="" disabled>
                    Chọn nhánh máy
                  </option>
                  {vehicle_type === "Máy Xúc" ? (
                    <>
                      <option value="Đào">Đào</option>
                      <option value="Lật">Lật</option>
                    </>
                  ) : vehicle_type === "Máy Lu" ? (
                    <>
                      <option value="Tĩnh">Tĩnh</option>
                      <option value="Rung">Rung</option>
                    </>
                  ) : (
                    ""
                  )}
                </Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            {vehicle_type === "Máy Xúc" || vehicle_type === "Máy Cẩu" ? (
              <Form.Group className="mb-2 flex align-center">
                <Form.Label className="mb-0 w-[37%]">Loại Bánh Xe :</Form.Label>
                <Form.Control
                  as="select"
                  name="wheel_type"
                  required
                  value={wheel_type}
                  onChange={onChangeUpdateVehicleForm}
                >
                  <option hidden value="" disabled>
                    Chọn loại bánh xe
                  </option>
                  {vehicle_type === "Máy Xúc" ? (
                    <>
                      <option value="Bánh Xích">Bánh Xích</option>
                      <option value="Bánh Lốp">Bánh Lốp</option>
                    </>
                  ) : vehicle_type === "Máy Cẩu" ? (
                    <>
                      <option value="Bánh Lốp">Bánh Lốp</option>
                      <option value="Bánh Xích">Bánh Xích</option>
                      <option value="Chân Nhện">Chân Nhện</option>
                    </>
                  ) : (
                    <option value="Mặc Định">Mặc Định</option>
                  )}
                </Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Hãng Sản Xuất :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hãng Sản Xuất"
                name="manufacturer"
                value={manufacturer}
                onChange={onChangeUpdateVehicleForm}
              />
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Nơi Sản Xuất :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nơi Sản Xuất"
                name="manufacturer_country"
                value={manufacturer_country}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Năm Sản Xuất :</Form.Label>
              <Form.Control
                type="number"
                placeholder="Năm Sản Xuất"
                name="manufacturer_year"
                value={manufacturer_year}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Model Máy :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Model Máy"
                name="vehicle_model"
                value={vehicle_model}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Công Suất Máy :</Form.Label>
              <Form.Control
                type="number"
                placeholder="Công Suất Máy"
                name="engine_capacity"
                value={engine_capacity}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            {vehicle_type === "Máy Xúc" ? (
              <Form.Group className="mb-2 flex align-center">
                <Form.Label className="mb-0 w-[37%]">Dung Tích Gầu :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Dung Tích Gầu"
                  name="bucket_capacity"
                  value={bucket_capacity}
                  onChange={onChangeUpdateVehicleForm}
                ></Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            {vehicle_type === "Máy Lu" || vehicle_type === "Máy Cẩu" ? (
              <Form.Group className="mb-2 flex align-center">
                <Form.Label className="mb-0 w-[37%]">Trọng Tải :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Trọng Tải"
                  name="vehicle_tonnage"
                  value={vehicle_tonnage}
                  onChange={onChangeUpdateVehicleForm}
                ></Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Số Giờ :</Form.Label>
              <Form.Control
                type="number"
                placeholder="Số Giờ"
                name="hours_worked"
                value={hours_worked}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Giá :</Form.Label>
              <Form.Control
                type="number"
                placeholder="Giá/Triệu"
                name="price"
                value={price}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
            <Form.Label className="mb-0 w-[37%]">Tình Trạng :</Form.Label>
              <Form.Control
                as="select"
                name="vehicle_status"
                required
                value={vehicle_status}
                onChange={onChangeUpdateVehicleForm}
              >
                <option hidden value="" disabled>
                  Tình Trạng Máy
                </option>
                <option value="Đang Ở Việt Nam">Đang Ở Việt Nam</option>
                <option value="Đang Ở Nước Ngoài">Đang Ở Nước Ngoài</option>
                <option value="Đã Bán">Đã Bán</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Link Ảnh :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link Ảnh"
                name="picture"
                value={picture}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Link Driver :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link Google Drive"
                name="driver_link"
                value={driver_link}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center">
              <Form.Label className="mb-0 w-[37%]">Mô Tả :</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Mô Tả Máy"
                name="description"
                value={description}
                onChange={onChangeUpdateVehicleForm}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Sửa
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UpdateVehicleModal;
