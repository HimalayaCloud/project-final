import React from "react";
import NavbarMenu from "../layout/NavbarMenu";
import { Button } from "antd";

const HomePage = () => {
  return (
    <>
      <NavbarMenu></NavbarMenu>
      <div className="h-screen bg-[whitesmoke] pt-12">
        <div className="w-[1280px] h-[134px] mx-auto bg-white rounded flex items-center">
          <div className="w-[900px] mx-auto relative flex">
            <input
              className="bg-[#FABE001A] w-full rounded-full h-[54px] px-3"
              placeholder="SearchBar"
            />
            <Button className="absolute right-4 top-4">Tìm Kiếm</Button>
          </div>
        </div>
        {/* <div className="w-[1280px] mx-auto bg-white rounded">hello</div> */}
      </div>
    </>
  );
};

export default HomePage;
