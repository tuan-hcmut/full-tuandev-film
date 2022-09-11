import React from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface paginationPros {
  pageTrigger: string;
  pageArr: number[];
  setPageFunc: any;
}
const Pagination: React.FC<paginationPros> = ({
  pageTrigger,
  pageArr,
  setPageFunc,
}) => {
  return (
    <>
      <div className="flex md:gap-4 w-[100%] justify-center items-center my-44">
        <AiOutlineLeft
          onClick={() => {
            if (Number(pageTrigger) < 11) return;
            setPageFunc(
              (pageArr[0] - 10).toString(),
              pageArr.map((el) => el - 10)
            );
          }}
          className="mr-4 text-3xl font-medium hover:text-color-blue  transition duration-200 rounded-full cursor-pointer"
        />
        {pageArr.map((el, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setPageFunc(el.toString(), pageArr);
              }}
              className={`w-[3rem] py-2 px-3 !text-3xl font-medium hover:text-color-blue  transition duration-200 rounded-full cursor-pointer ${
                Number(pageTrigger) === el && "!text-color-blue underline "
              }`}
            >
              {el}
            </div>
          );
        })}
        <AiOutlineRight
          onClick={() => {
            if (Number(pageTrigger) > 90) return;
            setPageFunc(
              (pageArr[0] + 10).toString(),
              pageArr.map((el) => el + 10)
            );
          }}
          className="ml-4 text-3xl font-medium hover:text-color-blue  transition duration-200 rounded-full cursor-pointer"
        />
      </div>
    </>
  );
};

export default Pagination;
