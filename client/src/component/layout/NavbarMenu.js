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
    logoutUser
  } = useContext(AuthContext);

  const onLogout = () => logoutUser()
  return (
    <NavBar expand="lg" bg="primary" variant="dark" className="shadow">
      <NavBar.Brand className="font-weight-bolder text-white">
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
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav className="align-center mr-10">
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
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
    </NavBar>
  );
};

export default NavbarMenu;
