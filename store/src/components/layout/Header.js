/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { GuestContext } from "../../contexts/GuestContext";
import { VehiclesContext } from "../../contexts/VehiclesContext";
import LogoutIcon from "../icons/LogoutIcon";

const Header = () => {
  const {
    guestState: { guest },
    logoutGuest,
  } = useContext(GuestContext);

  const {
    cartState: { cart },
    getCart,
  } = useContext(CartContext);

  const {
    vehicleState: { vehicles },
    searchVehicles,
  } = useContext(VehiclesContext);

  const navigate = useNavigate()

  useEffect(() => {
    getCart();
  }, []);

  const onLogout = () => {
    logoutGuest();
    navigate('/')
    window.location.reload()
  };
  const [searchInfo, setSearchInfo] = useState({
    vehicle_name: "",
    vehicle_type: "",
    price_range: { minPrice: 0, maxPrice: 100000 },
    bucket_capacity: "",
    vehicle_tonnage: "",
  });

  const onChangeSearchVehicleForm = (event) => {
    setSearchInfo({ ...searchInfo, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await searchVehicles(searchInfo);
    console.log(response,'dauyne');
  };
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4 font-bold text-3xl">VCM GROUP</div>
            <div className="col-lg-6 col-sm-12">
              <form onSubmit={onSubmit} className="search">
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_name"
                    onChange={onChangeSearchVehicleForm}
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="widgets-wrap float-md-right">
                <div className="widget-header  mr-3">
                  <a
                    href="/gio-hang"
                    className="icon icon-sm rounded-circle border"
                  >
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                  <span className="badge badge-pill badge-danger notify">
                    {cart?.cart_products?.length}
                  </span>
                </div>
                <div className="widget-header icontext">
                  <div className="text">
                    {guest?.guest_name ? (
                      <>
                        <span className="text-muted">
                          Xin Ch??o {guest?.guest_name}!
                        </span>
                        <button
                          onClick={onLogout}
                          type="button"
                          className="btn btn-dark ml-2"
                        >
                          <LogoutIcon />
                          ????ng Xu???t
                        </button>
                      </>
                    ) : (
                      <div>
                        <a href="dang-nhap">????ng nh???p</a> |
                        <a href="dang-ky"> ????ng K??</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main_nav"
            aria-controls="main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link" href="/">
                  Trang Ch???
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  {" "}
                  Lo???i M??y
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/may-xuc">
                    M??y X??c
                  </a>
                  <a className="dropdown-item" href="/may-lu">
                    M??y Lu
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/may-ui">
                    M??y ???i
                  </a>
                  <a className="dropdown-item" href="/may-cau">
                    M??y C???u
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Tin T???c
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Video
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  H??nh ???nh
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
