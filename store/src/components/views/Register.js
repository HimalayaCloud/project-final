import React from "react";
import { Button } from "react-bootstrap";
import { GuestContext } from "../../contexts/GuestContext";
import "../styles/login.css";
import { useContext, useState } from "react";
import AlertMessage from "../layout/AlertMessage";

const Register = () => {
  const { registerGuest } = useContext(GuestContext);

  const [registerForm, setRegisterForm] = useState({
    guest_name: "",
    guest_email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const {
    guest_name,
    guest_email,
    password,
    guest_phone,
    guest_address,
    confirm_password,
  } = registerForm;

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirm_password) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    try {
      const registerData = await registerGuest(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
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
              <h3>Đăng ký</h3>
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
              <form onSubmit={register}>
                <AlertMessage info={alert} />
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên Người Dùng"
                    name="guest_name"
                    value={guest_name}
                    onChange={onChangeRegisterForm}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="guest_email"
                    value={guest_email}
                    onChange={onChangeRegisterForm}
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
                    value={password}
                    onChange={onChangeRegisterForm}
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
                    placeholder="Nhập lại mật khẩu"
                    name="confirm_password"
                    value={confirm_password}
                    onChange={onChangeRegisterForm}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Số Điện Thoại"
                    name="guest_phone"
                    value={guest_phone}
                    onChange={onChangeRegisterForm}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="fas fa-address-card"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Địa Chỉ"
                    name="guest_address"
                    value={guest_address}
                    onChange={onChangeRegisterForm}
                  />
                </div>

                <div className="form-group text-center mt-4">
                  <button className="btn login_btn">Đăng Ký</button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Đã có tài khoản?<a href="/dang-nhap">Đăng Nhập</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
