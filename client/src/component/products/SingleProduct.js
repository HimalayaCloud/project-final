import React from "react";

const SingleProduct = ({ vehicle }) => {
  return (
    <div className="w-[24%] bg-white h-[440px] mx-[6px] mb-[12px] hover:shadow-lg  rounded">
      <div className=" shadow-sm h-full">
        {/* img */}
        <div>
          <img
            src={vehicle.pictureUrl}
            className="w-full h-[200px] rounded-t"
            alt="ảnh máy"
          ></img>
        </div>
        {/* Content */}
        <div className="px-[16px] py-[12px]">
          <div className="text-[#eb6864] font-semibold">
            {vehicle.vehicle_name}
          </div>
          <div>
            <p>
              Giá tiền: <span>{vehicle.price} triệu</span>
            </p>
          </div>
          <div>
            <p>
              Công suất: <span>{vehicle.engine_capacity}</span>
            </p>
          </div>
          {vehicle.bucket_capacity ? (
            <div>
              <p>
                Dung tích gầu: <span>{vehicle.bucket_capacity}</span>
              </p>
            </div>
          ) : (
            ""
          )}
          {vehicle.vehicle_tonnage ? (
            <div>
              <p>
                Trọng tải: <span>{vehicle.vehicle_tonnage}</span>
              </p>
            </div>
          ) : (
            ""
          )}
          <div>
            <p>
              Số giờ: <span>{vehicle.hours_worked}</span>
            </p>
          </div>
          <div>
            <p>
              Tình trạng: <span>{vehicle.vehicle_status}</span>
            </p>
          </div>
          <div>
            <p className="truncate">
              Link Driver:{" "}
              <a href={vehicle.driver_link}>{vehicle.driver_link}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
