import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);
  // Router
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/trang-chu");
        console.log("login successful");
      } else {
        console.log(loginData);
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AlertMessage info={alert}></AlertMessage>
      <Form onSubmit={login}>
        <Form.Group className="mt-[20px] mb-[10px]">
          <Form.Control
            type="text"
            placeholder="Tên Đăng Nhập"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-[10px]">
          <Form.Control
            type="password"
            placeholder="Mật Khẩu"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Button className="mb-[10px]" variant="success" type="submit">
          Đăng Nhập
        </Button>
      </Form>
      <p>
        Chưa có tài khoản?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Đăng Ký
          </Button>
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
