import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MultiRangeSlider from "multi-range-slider-react";

const SearchBar = () => {
  const [showMinMax, setShowMinMax] = useState(false);
  window.onclick = (e) => {
    if (!e.target.matches(".dropdown-btn")) {
      setShowMinMax(false);
    }
  };
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100000);
  const handleSlider = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const [newVehicle, setNewVehicle] = useState({
    vehicle_name: "",
    vehicle_type: "",
    vehicle_branch: "",
    wheel_type: "",
    manufacturer: "",
    manufacturer_country: "",
    manufacturer_year: "",
    vehicle_model: "",
    engine_capacity: "",
    bucket_capacity: "",
    vehicle_tonnage: "",
    hours_worked: "",
    price: "",
    vehicle_status: "",
    description: "",
    picture: "",
    driver_link: "",
  });

  const {
    vehicle_type,
    vehicle_branch,
    wheel_type,
    manufacturer,
    manufacturer_country,
    manufacturer_year,
    vehicle_model,
    engine_capacity,
    bucket_capacity,
    vehicle_tonnage,
    hours_worked,
    price,
    vehicle_status,
    description,
    picture,
    driver_link,
  } = newVehicle;
  const onChangeSearchVehicleForm = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
  };
  return (
    <div className="w-[1280px] h-[134px] mx-auto rounded flex items-center bg-[#eb6864]">
      <div className="w-[900px] mx-auto relative flex">
        <Form className="w-full">
          <input
            className="bg-white w-full rounded-1 h-[54px] px-3 border-0 focus-visible:border-blue-400"
            placeholder="SearchBar"
          />
          <Button className="absolute right-4 top-[8px] bg-[#eb6864] border-transparent">
            Tìm Kiếm
          </Button>
          {/* Filter */}
          <div className="mt-2 flex">
            <Form.Group className="mb-2 flex align-center mr-2">
              {/* <Form.Label className="mb-0 w-[37%]">Loại Máy :</Form.Label> */}
              <Form.Control
                className="cursor-pointer"
                as="select"
                name="vehicle_type"
                required
                value={vehicle_type}
                onChange={onChangeSearchVehicleForm}
              >
                <option hidden value="" disabled>
                  Tất cả loại máy
                </option>
                <option value="Máy Xúc">Máy Xúc</option>
                <option value="Máy Lu">Máy Lu</option>
                <option value="Máy Ủi">Máy Ủi</option>
                <option value="Máy Cẩu">Máy Cẩu</option>
              </Form.Control>
            </Form.Group>
            {/* mức giá */}
            <Form.Group className="mb-2 flex align-center relative">
              <p
                onClick={() => setShowMinMax(!showMinMax)}
                style={{ border: "1px solid #ced4da" }}
                className="dropdown-btn py-[6px] px-[16px] rounded cursor-pointer bg-white"
              >
                Mức Giá
              </p>
              {showMinMax ? (
                <div className="absolute dropdown-btn top-11 w-[250px] h-[300px] bg-white border-1 rounded shadow px-2 py-2 overflow-auto z-10">
                  <div>
                    <MultiRangeSlider
                      min={0}
                      max={100000}
                      step={50}
                      label={false}
                      ruler={false}
                      preventWheel={false}
                      minValue={minValue}
                      maxValue={maxValue}
                      onInput={(e) => {
                        handleSlider(e);
                      }}
                    />
                    <div className="flex justify-between">
                      <span>Từ: {minValue}</span>
                      <span>Đến: {maxValue}</span>
                    </div>
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    Tất cả mức giá
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    Dưới 500 triệu
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    500 - 800 triệu
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    800 triệu - 1 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    1 - 2 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    2 - 3 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    3 - 5 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    5 - 7 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    7 - 10 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    10 - 20 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    20 - 30 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    30 - 40 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    40 - 60 tỷ
                  </div>
                  <div className="hover:bg-slate-300 cursor-pointer">
                    Trên 60 tỷ
                  </div>
                </div>
              ) : (
                ""
              )}
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
