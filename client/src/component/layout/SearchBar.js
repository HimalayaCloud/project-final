import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import MultiRangeSlider from "multi-range-slider-react";
import arrowRight from "../../assets/arrow-right.svg";
import { VehiclesContext } from "../../contexts/VehicleContext";
const SearchBar = () => {
  const [showMinMax, setShowMinMax] = useState(false);
  const { searchVehicles } = useContext(VehiclesContext)

  // window.onclick = (e) => {
  //   if (!e.target.matches(".dropdown-btn")) {
  //     setShowMinMax(true);
  //   }
  // };
  const useOutside = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowMinMax(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const priceRef = useRef(null);
  // Listen for input event on numInput.
  useOutside(priceRef);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100000);
  const handleSlider = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  // console.log(showMinMax)
  const priceRange = [
    {
      range: "Tất cả mức giá",
      minPrice: 0,
      maxPrice: 100000,
    },
    {
      range: "Dưới 500 triệu",
      minPrice: 0,
      maxPrice: 500,
    },
    {
      range: "500 - 800 triệu",
      minPrice: 500,
      maxPrice: 800,
    },
    {
      range: "800 triệu - 1 tỷ",
      minPrice: 800,
      maxPrice: 1000,
    },
    {
      range: "1 - 2 tỷ",
      minPrice: 1000,
      maxPrice: 2000,
    },
    {
      range: "2 - 3 tỷ",
      minPrice: 2000,
      maxPrice: 3000,
    },
    {
      range: "3 - 5 tỷ",
      minPrice: 3000,
      maxPrice: 5000,
    },
    {
      range: "5 - 7 tỷ",
      minPrice: 5000,
      maxPrice: 7000,
    },
    {
      range: "7 - 10 tỷ",
      minPrice: 7000,
      maxPrice: 10000,
    },
    {
      range: "10 - 20 tỷ",
      minPrice: 10000,
      maxPrice: 20000,
    },
    {
      range: "20 - 30 tỷ",
      minPrice: 20000,
      maxPrice: 30000,
    },
    {
      range: "30 - 40 tỷ",
      minPrice: 30000,
      maxPrice: 40000,
    },
    {
      range: "40 - 60 tỷ",
      minPrice: 40000,
      maxPrice: 60000,
    },
    {
      range: "60 - 100 tỷ",
      minPrice: 60000,
      maxPrice: 100000,
    },
  ];

  const [searchInfo, setSearchInfo] = useState({
    vehicle_name: "",
    vehicle_type: "",
    price_range: { minPrice: 0, maxPrice: 100000 },
    bucket_capacity: "",
    vehicle_tonnage: "",
  });

  const {
    vehicle_name,
    vehicle_type,
    price_range,
    bucket_capacity,
    vehicle_tonnage,
  } = searchInfo;

  useEffect(() => {
    setSearchInfo({
      ...searchInfo,
      price_range: { minPrice: minValue, maxPrice: maxValue },
    });
  }, [minValue, maxValue]);

  const onChangeSearchVehicleForm = (event) => {
    setSearchInfo({ ...searchInfo, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await searchVehicles(searchInfo)
    console.log(response);
  };
  return (
    <div className="w-[1280px] h-[134px] mx-auto rounded flex items-center bg-[#eb6864]">
      <div className="w-[900px] mx-auto relative flex">
        <Form onSubmit={onSubmit} className="w-full">
          <Form.Group>
            <Form.Control
              type="text"
              name="vehicle_name"
              onChange={onChangeSearchVehicleForm}
              className="bg-white w-full rounded-1 h-[54px] px-3 border-0 focus-visible:border-blue-400"
              placeholder="SearchBar"
            />
            <Button
              type="submit"
              className="absolute right-4 top-[8px] bg-[#eb6864] border-transparent"
            >
              Tìm Kiếm
            </Button>
          </Form.Group>
          {/* Filter */}
          <div className="mt-2 flex">
            <Form.Group className="mb-2 flex align-center mr-2">
              {/* <Form.Label className="mb-0 w-[37%]">Loại Máy :</Form.Label> */}
              <Form.Control
                className="cursor-pointer"
                as="select"
                name="vehicle_type"
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
            <Form.Group className="mb-2 flex align-center relative mr-2">
              <p
                onClick={() => setShowMinMax(!showMinMax)}
                style={{ border: "1px solid #ced4da" }}
                className="dropdown-btn py-[6px] w-[200px] px-[16px] rounded cursor-pointer bg-white"
              >
                {minValue === "" || minValue === 0 ? (
                  <span>
                    ≤{" "}
                    {maxValue / 1000 < 1
                      ? `${maxValue} triệu`
                      : `${maxValue / 1000} tỷ`}
                  </span>
                ) : (
                  <span>
                    {minValue / 1000 < 1
                      ? `${minValue} triệu`
                      : `${minValue / 1000}`}{" "}
                    -{" "}
                    {maxValue / 1000 < 1
                      ? `${maxValue} triệu`
                      : `${maxValue / 1000} tỷ`}
                  </span>
                )}
              </p>
              {showMinMax ? (
                <div
                  ref={priceRef}
                  className="absolute dropdown-btn top-11 w-[250px] h-[300px] bg-white border-1 rounded shadow px-2 py-2 overflow-auto z-10"
                >
                  <div className="flex justify-between">
                    <div>
                      <input
                        type="number"
                        className="w-[80px] text-center py-1 rounded border-[1px] border-slate-400"
                        placeholder="Từ"
                        min="0"
                        max={100000}
                        value={minValue}
                        onChange={(e) => {
                          setMinValue(e.target.value);
                        }}
                      />
                    </div>
                    <img src={arrowRight} alt="arrowRight"></img>
                    <div>
                      <input
                        type="number"
                        className="w-[80px] text-center py-1 rounded border-[1px] border-slate-400"
                        placeholder="Đến"
                        value={maxValue}
                        min={0}
                        max={100000}
                        onChange={(e) => {
                          setMaxValue(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <MultiRangeSlider
                      min={0}
                      max={100000}
                      step={1}
                      label={false}
                      ruler={false}
                      preventWheel={false}
                      minValue={minValue}
                      maxValue={maxValue}
                      onInput={(e) => {
                        handleSlider(e);
                      }}
                    />
                  </div>
                  {priceRange.map((range, index) => {
                    return (
                      <PriceRange
                        key={index}
                        range={range.range}
                        minPrice={range.minPrice}
                        maxPrice={range.maxPrice}
                        setMinValue={setMinValue}
                        setMaxValue={setMaxValue}
                        setShowMinMax={setShowMinMax}
                      ></PriceRange>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-2 flex align-center mr-2">
              {/* <Form.Label className="mb-0 w-[37%]">Loại Máy :</Form.Label> */}
              <Form.Control
                className="cursor-pointer"
                type="number"
                name="bucket_capacity"
                placeholder="Dung tích gầu"
                value={bucket_capacity}
                onChange={onChangeSearchVehicleForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2 flex align-center mr-2">
              {/* <Form.Label className="mb-0 w-[37%]">Loại Máy :</Form.Label> */}
              <Form.Control
                className="cursor-pointer"
                type="number"
                name="vehicle_tonnage"
                placeholder="Trọng tải"
                value={vehicle_tonnage}
                onChange={onChangeSearchVehicleForm}
              ></Form.Control>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
};

const PriceRange = ({
  range,
  minPrice,
  maxPrice,
  setMaxValue,
  setMinValue,
  setShowMinMax,
}) => {
  return (
    <div
      onClick={() => {
        setMinValue(minPrice);
        setMaxValue(maxPrice);
        setShowMinMax(false);
      }}
      className="hover:bg-slate-300 cursor-pointer"
    >
      {range}
    </div>
  );
};

export default SearchBar;
