import React from "react";
import { Button } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

const SingleVehicle = ({
  index,
  vehicle: { _id, vehicle_name, price, pictureUrl, driver_link },
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img
          style={{ maxHeight: "100px", width: "150px", objectFit: "fill" }}
          src={pictureUrl}
          alt="ảnh xe"
        />
      </td>
      <td>{vehicle_name}</td>
      <td>{price < 1000 ? `${price} triệu` : `${price/1000} tỷ`}</td>
      <td>
        <a href={driver_link}>{driver_link}</a>
      </td>
      <td>
        <ActionButtons _id={_id}></ActionButtons>
      </td>
    </tr>
  );
};

export default SingleVehicle;
