import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Auth from "./component/views/Auth";
import AuthContextProvider from "./contexts/AuthContext";

import ProtectedRoute from "./component/routing/ProtectedRoute";
import HomePage from "./component/views/HomePage";

import VehicleContextProvider from "./contexts/VehicleContext";

function App() {
  return (
    <AuthContextProvider>
      <VehicleContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing></Landing>}></Route>
            <Route
              exact
              path="/login"
              element={<Auth authRoute={"login"}></Auth>}
            ></Route>
            <Route
              exact
              path="/register"
              element={<Auth authRoute={"register"}></Auth>}
            ></Route>
            <Route exact element={<ProtectedRoute />}>
              <Route
                exact
                path="/trang-chu"
                element={<HomePage></HomePage>}
              ></Route>
            </Route>
          </Routes>
        </Router>
      </VehicleContextProvider>
    </AuthContextProvider>
  );
}
export default App;
