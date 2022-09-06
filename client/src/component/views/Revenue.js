import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import NavbarMenu from "../layout/NavbarMenu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Revenue.css";
import OrderDetailModal from "../vehicles/OrderDetailModal";
import { Table } from "react-bootstrap";

const Revenue = () => {
  const {
    transactionState: { transactions, totalAmount },
    getTransaction,
    getRevenue,
    findOrderDetails,
    setShowModal,
  } = useContext(TransactionContext);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [startDate, setStartDate] = useState(new Date(2022, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2022, 11, 30));
  useEffect(() => {
    getTransaction();
  }, []);
  useEffect(() => {
    const resultGetTransaction = getRevenue(
      startDate.toISOString(),
      endDate.toISOString()
    );
  }, [startDate, endDate]);
  console.log(totalAmount, "herere");
  return (
    <>
      <NavbarMenu></NavbarMenu>
      <OrderDetailModal></OrderDetailModal>
      <div className="h-screen bg-[whitesmoke] pt-12 flex flex-wrap">
        <div className="w-[1280px] overflow-auto p-10 mx-auto rounded relative mt-2">
          <div className="flex">
            <div className="mt-1 mr-2 bold">Từ</div>
            <DatePicker
              portalId="root-portal"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText={"dd/mm/yyyy"}
              showYearDropdown // year show and scrolldown alos
              scrollableYearDropdown
              popperProps={{ strategy: "fixed" }}
              wrapperClassName="datepicker-wrapper"
            />
            <div className="mt-1 mr-2 bold">Đến</div>
            <DatePicker
              portalId="root-portal"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText={"dd/mm/yyyy"}
              showYearDropdown // year show and scrolldown alos
              scrollableYearDropdown
              popperProps={{ strategy: "fixed" }}
              wrapperClassName="datepicker-wrapper"
            />
          </div>
          <div className="overflow-auto max-h-[600px] mx-auto bg-white rounded relative mt-2 p-4">
            <div className="text-3xl pb-2 border-solid border-x-0 border-t-0 border-b-2 border-black">
              Doanh thu
            </div>
            <Table style={{ overflowY: "scroll" }}>
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Tên Khách Hàng</th>
                  <th style={{ width: "15%" }}>Email</th>
                  <th style={{ width: "10%" }}>Địa Chỉ</th>
                  <th style={{ width: "10%" }}>Số Điện Thoại</th>
                  <th style={{ width: "8%" }}>Tổng Tiền</th>
                  <th style={{ width: "12%" }}>Ngày Tạo</th>
                  <th style={{ width: "10%" }}>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction, index) => {
                  let create_at = new Date(transaction.createdAt);
                  if (transaction?.status === 1) {
                    return (
                      <tr key={index}>
                        <td>{transaction.guest_name}</td>
                        <td>{transaction.guest_email}</td>
                        <td>{transaction.guest_address}</td>
                        <td>0{transaction.guest_phone}</td>
                        <td>
                          {transaction.amount > 999
                            ? `${transaction.amount / 1000} tỷ`
                            : `${transaction.amount} triệu`}
                        </td>
                        <td>{create_at.toLocaleString("en-US")}</td>
                        <td>
                          <button
                            onClick={() => {
                              findOrderDetails(transaction._id);
                              setShowModal(true);
                            }}
                            className="btn btn-success"
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
            <div className="text-xl bold">
              Tổng doanh thu:{" "}
              {totalAmount > 999
                ? `${totalAmount / 1000} tỷ`
                : `${totalAmount} triệu`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Revenue;
