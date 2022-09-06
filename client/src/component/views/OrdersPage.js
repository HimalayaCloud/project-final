import React, { useContext, useEffect, useState } from "react";
import NavbarMenu from "../layout/NavbarMenu";
import { AuthContext } from "../../contexts/AuthContext";
import { Modal, Table, Toast } from "react-bootstrap";
import { TransactionContext } from "../../contexts/TransactionContext";

const OrdersPage = () => {
  const [orderDetailModal, setOrderDetailModal] = useState(false)

  const {
    transactionState: { transactions },
    getTransaction,
    updateStatus,
    deleteTransaction,
  } = useContext(TransactionContext);

  useEffect(() => {
    getTransaction();
  }, []);

  console.log(transactions, "dayyyyneneee");

  const onUpdateStatus = (transaction) => {
    if (transaction.status === 0) {
      transaction.status = 1;
    } else {
      transaction.status = 0;
    }
    console.log(transaction, "odayne");
    updateStatus({ ...transaction });
  };

  const onDeleteTransaction = (transaction_id) => {
    deleteTransaction(transaction_id);
  };

  const closeModal = () => {
    setOrderDetailModal(false)
  }

  return (
    <>
      <NavbarMenu></NavbarMenu>
      <Modal show={orderDetailModal} onHide={closeModal}>
        <Modal.Header closeButton><h2>Chi tiết hóa đơn</h2></Modal.Header>
        <Modal.Body>
          <div>Tên khách hàng:</div>
        </Modal.Body>
      </Modal>
      <div className="h-screen bg-[whitesmoke] pt-12">
        <div className="w-[1280px] overflow-auto max-h-[600px] mx-auto bg-white rounded relative mt-2 p-4">
          <div className="text-3xl pb-2 border-solid border-x-0 border-t-0 border-b-2 border-black">
            Danh sách giao dịch
          </div>
          <Table style={{ overflowY: "scroll" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>STT</th>
                <th style={{ width: "15%" }}>Tên Khách Hàng</th>
                <th style={{ width: "15%" }}>Email</th>
                <th style={{ width: "10%" }}>Địa Chỉ</th>
                <th style={{ width: "10%" }}>Số Điện Thoại</th>
                <th style={{ width: "10%" }}>Tổng Tiền</th>
                <th style={{ width: "10%" }}>Ngày Tạo</th>
                <th style={{ width: "5%" }}>Trạng Thái</th>
                <th style={{ width: "25%" }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, index) => {
                let create_at = new Date(transaction.createdAt);
                return (
                  <tr>
                    <td>{index}</td>
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
                          onUpdateStatus(transaction);
                        }}
                        className={
                          transaction.status === 0
                            ? "btn btn-secondary w-40"
                            : "btn btn-primary w-40"
                        }
                      >
                        {transaction.status === 0
                          ? "Chưa thanh toán"
                          : "Đã thanh toán"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          onDeleteTransaction(transaction._id);
                        }}
                        disabled={transaction.status === 0 ? false : true}
                        class={
                          transaction.status === 0
                            ? "btn btn-info"
                            : "btn btn-secondary "
                        }
                      >
                        Hủy đơn
                      </button>{" "}
                      | <button onClick={() => {setOrderDetailModal(true)}} className="btn btn-success">Chi tiết</button>
                    </td>
                  </tr>
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
