import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Auth from "./component/views/Auth";
import AuthContextProvider from "./contexts/AuthContext";

import ProtectedRoute from "./component/routing/ProtectedRoute";
import HomePage from "./component/views/HomePage";

import VehicleContextProvider from "./contexts/VehicleContext";
import ProductPage from "./component/views/ProductPage";
import OrdersPage from "./component/views/OrdersPage";
import TransactionContextProvider from "./contexts/TransactionContext";

function App() {
  return (
    <AuthContextProvider>
      <VehicleContextProvider>
        <TransactionContextProvider>
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
              <Route exact element={<ProtectedRoute />}>
                <Route
                  exact
                  path="/trang-san-pham"
                  element={<ProductPage></ProductPage>}
                ></Route>
              </Route>
              <Route exact element={<ProtectedRoute />}>
                <Route
                  exact
                  path="/don-hang"
                  element={<OrdersPage></OrdersPage>}
                ></Route>
              </Route>
            </Routes>
          </Router>
        </TransactionContextProvider>
      </VehicleContextProvider>
    </AuthContextProvider>
  );
}
export default App;
