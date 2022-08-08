import React, { useContext } from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {
    authState: { user: username },
    logoutUser,
  } = useContext(AuthContext);

  const onLogout = () => logoutUser();
  return (
    <NavBar expand="lg" variant="dark" className="shadow bg-[#eb6864]">
      <div className="flex w-[1280px] mx-auto">
        <NavBar.Brand className="font-weight-bolder text-white flex items-center pb-[5px] pt-0">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="32"
            height="32"
            className="mr-2"
          ></img>
          SearchApp
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "space-between" }}
        >
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/trang-chu"
              as={Link}
            >
              Trang Chủ
            </Nav.Link>
          </Nav>
          <Nav className="align-center">
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white flex items-center bg-black"
              onClick={onLogout}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width={32}
                height={32}
                className="mr-2"
              ></img>
              Logout
            </Button>
          </Nav>
        </NavBar.Collapse>
      </div>
    </NavBar>
  );
};

export default NavbarMenu;
