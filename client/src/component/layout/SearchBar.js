import React from "react";
import { Button, Form } from "react-bootstrap";

const SearchBar = () => {
  return (
    <div className="w-[1280px] h-[134px] mx-auto bg-white rounded flex items-center">
      <div className="w-[900px] mx-auto relative flex">
        <Form className="w-full">
          <input
            className="bg-[#FABE001A] w-full rounded-1 h-[54px] px-3 border-0 focus-visible:border-blue-400"
            placeholder="SearchBar"
          />
          <Button className="absolute right-4 top-[8px] bg-[#eb6864] border-transparent">
            Tìm Kiếm
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
