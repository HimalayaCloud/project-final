/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const NavBanner = () => {
  return (
    <section className="section-main bg padding-y">
      <div className="container">
        <div className="row">
          {/* <aside className="col-md-3">
            <nav className="card">
              <ul className="menu-category">
                <li>
                  <a href="#">Máy Xúc</a>
                </li>
                <li>
                  <a href="#">Máy Lu</a>
                </li>
                <li>
                  <a href="#">Máy Ủi</a>
                </li>
                <li>
                  <a href="#">Máy Cẩu</a>
                </li>
              </ul>
            </nav>
          </aside> */}
          <div className="col-md-12">
            <article className="banner-wrap">
              <img src="assets/images/banner.jpg" className="w-100 rounded" />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBanner;
