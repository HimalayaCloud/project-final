import React, { useContext, useEffect } from "react";
import NavbarMenu from "../layout/NavbarMenu";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";

import { Table, Toast } from "react-bootstrap";

import { OrdersContext } from "../../contexts/OrderContext";
import SingleOrder from "../orders/SingleOrder";

const OrdersPage = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  // Post Context
  const {
    orderState: { order, orders },
    getOrders,
  } = useContext(OrdersContext);

  useEffect(() => {
    getOrders();
  }, []);
  console.log(orders);

  return (
    <>
      <NavbarMenu></NavbarMenu>
      <div className="h-screen bg-[whitesmoke] pt-12">
        <div className="w-[1280px] overflow-auto max-h-[600px]  mx-auto bg-white rounded relative mt-2">
          <Table style={{ overflowY: "scroll" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>STT</th>
                <th style={{ width: "15%" }}>Tên Khách Hàng</th>
                <th style={{ width: "10%" }}>Số Điện Thoại</th>
                <th style={{ width: "20%" }}>Email</th>
                <th style={{ width: "10%" }}>Ngày Tạo</th>
                <th style={{ width: "25%" }}>Lời Nhắn</th>
                <th style={{ width: "15%" }}>Trạng Thái</th>
              </tr>
            </thead>
            {/* {!vehiclesLoading ? ( */}
            <tbody>
              {orders.map((order, index) => {
                return (
                  <SingleOrder
                    key={index}
                    index={index}
                    order={order}
                  ></SingleOrder>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
