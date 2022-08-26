/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Header = () => {
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4 font-bold text-3xl">VCM GROUP</div>
            <div className="col-lg-6 col-sm-12">
              <form action="#" className="search">
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
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
                  <a href="#" className="icon icon-sm rounded-circle border">
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                  <span className="badge badge-pill badge-danger notify">
                    0
                  </span>
                </div>
                <div className="widget-header icontext">
                  <a href="#" className="icon icon-sm rounded-circle border">
                    <i className="fa fa-user"></i>
                  </a>
                  <div className="text">
                    <span className="text-muted">Welcome!</span>
                    <div>
                      <a href="#">Sign in</a> |<a href="#"> Register</a>
                    </div>
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
                  Trang Chủ
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  {" "}
                  Loại Máy
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/may-xuc">
                    Máy Xúc
                  </a>
                  <a className="dropdown-item" href="/may-lu">
                    Máy Lu
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/may-ui">
                    Máy Ủi
                  </a>
                  <a className="dropdown-item" href="/may-cau">
                    Máy Cẩu
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Tin Tức
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Video
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Hình Ảnh
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">
                  Trang Chủ
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