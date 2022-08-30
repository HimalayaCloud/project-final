/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import VehicleContextProvider from "./contexts/VehiclesContext";
import Cart from "./components/views/Cart";
import Excavator from "./components/views/Excavator";
import Roller from "./components/views/Roller";
import Bulldozers from "./components/views/Bulldozers";
import Crane from "./components/views/Crane";
import VehicleDetail from "./components/views/VehicleDetail";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import GuestContextProvider from "./contexts/GuestContext";
import CartContextProvider from "./contexts/CartContext";
import TransactionContextProvider from "./contexts/TransactionContext";

function App() {
  return (
    <div className="App">
      <GuestContextProvider>
        <VehicleContextProvider>
          <CartContextProvider>
            <Router>
              <Routes>
                <Route path="/dang-nhap" element={<Login></Login>}></Route>
                <Route path="/dang-ky" element={<Register></Register>}></Route>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route
                  path="/gio-hang"
                  element={
                    <TransactionContextProvider>
                      <Cart></Cart>
                    </TransactionContextProvider>
                  }
                ></Route>
                <Route
                  path="/may-xuc"
                  element={<Excavator></Excavator>}
                ></Route>
                <Route path="/may-lu" element={<Roller></Roller>}></Route>
                <Route
                  path="/may-ui"
                  element={<Bulldozers></Bulldozers>}
                ></Route>
                <Route path="/may-cau" element={<Crane></Crane>}></Route>
                <Route
                  path="/:id"
                  element={<VehicleDetail></VehicleDetail>}
                ></Route>
              </Routes>
            </Router>
          </CartContextProvider>
        </VehicleContextProvider>
      </GuestContextProvider>
    </div>
  );
}

export default App;
