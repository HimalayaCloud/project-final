import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import Header from "../layout/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GuestContext } from "../../contexts/GuestContext";
import { TransactionContext } from "../../contexts/TransactionContext";

const Cart = () => {
  const {
    cartState: { cart },
    getCart,
    updateQuantity,
    deleteCartProduct,
  } = useContext(CartContext);

  const {
    transactionState: { transactions },
    createTransaction
  } = useContext(TransactionContext);

  const {
    guestState: { guest },
  } = useContext(GuestContext);

  const notify = () =>
    toast(
      "Đặt hàng thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất, xin cảm ơn!",
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  useEffect(() => {
    getCart();
  }, []);

  const onChangeQuantity = (vehicle_id, new_quantity) => {
    const cartUpdateInfo = cart.cart_products.map((product) => {
      if (product.vehicle_id === vehicle_id) {
        return { ...product, quantity: new_quantity };
      } else {
        return product;
      }
    });
    updateQuantity(cartUpdateInfo);
  };

  const onDeleteCartProduct = (vehicle_id) => {
    deleteCartProduct(vehicle_id);
  };

  const totalPayment = cart?.cart_products?.reduce((totalPay, product) => {
    return totalPay + product.vehicle_price * product.quantity;
  }, 0);

  const onCreateTransaction = () => {
    const transactionInfo = {
      guest_id: guest._id,
      guest_name: guest.guest_name,
      guest_email: guest.guest_email,
      guest_phone: guest.guest_phone,
      guest_address: guest.guest_address,
      amount: totalPayment,
    };
    const response = createTransaction(transactionInfo);
    if (response) {
      notify();
    }
  };

  return (
    <>
      <Header></Header>

      <section className="section-name padding-y-sm">
        <div className="container">
          <table
            className="table table-hover"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <thead>
              <tr>
                <th scope="col" style={{ width: "5%" }}></th>
                <th scope="col" style={{ width: "15%" }}>
                  Tên máy
                </th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.cart_products?.map((product) => {
                return (
                  <tr key={product?._id}>
                    <td>
                      <img width={150} src={product?.pictureUrl}></img>
                    </td>
                    <td>{product?.vehicle_name}</td>
                    <td>
                      {product?.vehicle_price < 1000
                        ? `${product.vehicle_price} triệu`
                        : `${product.vehicle_price / 1000} tỷ`}
                    </td>
                    <td>
                      <a
                        type="submit"
                        onClick={() => {
                          if (product.quantity > 1) {
                            onChangeQuantity(
                              product.vehicle_id,
                              product.quantity - 1
                            );
                          }
                        }}
                        className="btn btn-light"
                      >
                        <MinusIcon />
                      </a>
                      <input
                        type="number"
                        className="btn btn-light w-14 rounded-none text-center pr-0"
                        value={product.quantity}
                        readOnly
                      />
                      <a
                        type="submit"
                        onClick={() =>
                          onChangeQuantity(
                            product.vehicle_id,
                            product.quantity + 1
                          )
                        }
                        className="btn btn-light"
                      >
                        <PlusIcon />
                      </a>
                    </td>
                    <td>
                      {product?.vehicle_price < 1000
                        ? product.vehicle_price * product.quantity > 999
                          ? `${
                              (product.vehicle_price * product.quantity) / 1000
                            } tỷ`
                          : `${product.vehicle_price * product.quantity} triệu`
                        : `${
                            (product.vehicle_price * product.quantity) / 1000
                          } tỷ`}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => onDeleteCartProduct(product.vehicle_id)}
                        className="btn btn-danger"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <button
              onClick={onCreateTransaction}
              className="btn btn-primary float-right w-44"
            >
              Đặt hàng
            </button>
            <div className="float-right mr-3 text-2xl">
              Tổng tiền: {""}
              <span className="text-red-500">
                ₫
                {totalPayment > 1000
                  ? `${totalPayment / 1000} tỷ`
                  : `${totalPayment} triệu`}
              </span>
            </div>
            <ToastContainer />
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
