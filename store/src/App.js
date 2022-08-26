/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import "./App.css";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import Footer from "./components/layout/Footer";
import VehicleContextProvider from "./contexts/VehiclesContext";
import Excavator from "./components/views/Excavator";
import Roller from "./components/views/Roller";
import Bulldozers from "./components/views/Bulldozers";
import Crane from "./components/views/Crane";
import VehicleDetail from "./components/views/VehicleDetail";

function App() {
  return (
    <div className="App">
      <VehicleContextProvider>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/may-xuc" element={<Excavator></Excavator>}></Route>
            <Route path="/may-lu" element={<Roller></Roller>}></Route>
            <Route path="/may-ui" element={<Bulldozers></Bulldozers>}></Route>
            <Route path="/may-cau" element={<Crane></Crane>}></Route>
            <Route path="/:id" element={<VehicleDetail></VehicleDetail>}></Route>
          </Routes>
        </Router>
        <Footer></Footer>
      </VehicleContextProvider>
    </div>
  );
}

export default App;
