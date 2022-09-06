/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

import Header from "../layout/Header";

const Orders = () => {
  const {
    transactionState: { transactions },
    getTransaction,
  } = useContext(TransactionContext);

  useEffect(() => {
    getTransaction();
  }, []);
  console.log(transactions, "odayne");
  return (
    <Fragment>
      <Header></Header>
      <section className="section-name padding-y-sm">
        <div className="container">
          <h1 className="mb-4">Đơn Hàng</h1>
          {transactions?.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1).map((transaction) => {
            return (
              <div key={transaction._id} className="bg-neutral-100 mb-12">
                {transaction.order_details.map((order_detail) => {
                  return (
                    <div key={order_detail._id} className="row mb-2 p-2">
                      <div className="col-md-2">
                        <img
                          width={150}
                          height={100}
                          src={order_detail.pictureUrl}
                        ></img>
                      </div>
                      <div className="col-md-6">
                        {order_detail.vehicle_name} x {order_detail.quantity}
                      </div>
                      <div className="col-md-3">
                        Giá: {order_detail.vehicle_price > 999
                          ? `${order_detail.vehicle_price / 1000} tỷ`
                          : `${order_detail.vehicle_price} triệu`}
                      </div>
                    </div>
                  );
                })}
                <div className="float-right mr-3 text-2xl">
                  Tổng tiền: {""}
                  <span className="text-red-500">
                    {transaction.amount > 999
                      ? `${transaction.amount / 1000} tỷ`
                      : `${transaction.amount} triệu`} VNĐ ({transaction.status === 0 ? "Chưa thanh toán" : "Đã thanh toán"})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
};

export default Orders;
