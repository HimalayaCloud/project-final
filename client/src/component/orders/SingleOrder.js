import React, { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../../contexts/OrderContext";

const SingleOrder = ({
  index,
  order: {
    _id,
    customer_name,
    customer_number,
    customer_email,
    create_at,
    customer_model,
    status,
  },
}) => {
  const {
    changeOrderStatus,
  } = useContext(OrdersContext);
  const [orderStatus, setOrderStatus] = useState("");
  useEffect(() => {
    setOrderStatus(status);
  }, []);
  const onChangeStatus = async (event) => {
    event.preventDefault();
    setOrderStatus(event.target.value);
    const response = await changeOrderStatus(_id, { status: event.target.value});
  };
  
  const createdDate = new Date(create_at).toLocaleString()

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{customer_name}</td>
      <td>0{customer_number}</td>
      <td>{customer_email}</td>
      <td>{createdDate}</td>
      <td>{customer_model}</td>
      <td>
        <select
          onChange={onChangeStatus}
          value={orderStatus}
        >
          <option value={"Chưa liên hệ"}>Chưa liên hệ</option>
          <option value={"Đã liên hệ"}>Đã liên hệ</option>
        </select>
      </td>
    </tr>
  );
};

export default SingleOrder;
