import React from "react";
import { Button } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

const SingleVehicle = ({
  index,
  vehicle: {
    _id,
    vehicle_name,
    price,
    picture,
    driver_link,
  },
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img width={150} src={picture} alt="ảnh xe" />
      </td>
      <td>{vehicle_name}</td>
      <td>{price} triệu VNĐ</td>
      <td>
        <a href={driver_link}>{driver_link}</a>
      </td>
      <td>
        <ActionButtons _id={_id} ></ActionButtons>
      </td>
    </tr>
  );
};

export default SingleVehicle;
