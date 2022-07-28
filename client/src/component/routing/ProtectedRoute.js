import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";


const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <Outlet></Outlet>
      </>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};

export default ProtectedRoute;
