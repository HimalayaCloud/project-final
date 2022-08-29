import React from "react";
import { Button } from "react-bootstrap";
import "../styles/login.css";
import { useState, useContext, useEffect } from "react";
import { GuestContext } from "../../contexts/GuestContext";
import AlertMessage from "../layout/AlertMessage";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    loginGuest,
    guestState: { isAuthenticated },
  } = useContext(GuestContext);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    guest_email: "",
    password: "",
  });

  useEffect(() => {
    if(isAuthenticated){
        navigate('/')
    }
  })
  const [alert, setAlert] = useState(null);

  const { guest_email, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginGuest(loginForm);
      if (loginData.success) {
        navigate("/");
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
    <div className="login-wraper">
      <div className="login-container">
        <div className="d-flex justify-content-center h-100">
          <div className="login-card">
            <div className="card-header">
              <h3>Đăng nhập</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-facebook-square" />
                </span>
                <span>
                  <i className="fab fa-google-plus-square" />
                </span>
                <span>
                  <i className="fab fa-twitter-square" />
                </span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={login}>
                <AlertMessage info={alert}></AlertMessage>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="guest_email"
                    required
                    value={guest_email}
                    onChange={onChangeLoginForm}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    required
                    value={password}
                    onChange={onChangeLoginForm}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Lưu thông tin
                </div>
                <div className="form-group text-center mt-4">
                  {/* <input
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn"
                    placeholder="Đăng Nhập"
                  /> */}
                  <button className="btn login_btn">Đăng Nhập</button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Chưa có tài khoản?<a href="/dang-ky">Đăng Ký</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="#">Quên mật khẩu?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
