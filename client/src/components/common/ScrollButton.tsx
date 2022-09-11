import React, { useContext } from "react";

import GeneralContext from "../../context/GeneralProvider";

import { BsChevronDoubleUp } from "react-icons/bs";

interface ContextProps {
  Scroll: boolean;
}

const ScrollButton: React.FC = () => {
  const { Scroll } = useContext<ContextProps>(GeneralContext);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        onClick={() => {
          goToTop();
        }}
        className={`${
          Scroll && "bottom-[8rem] !flex"
        } fixed w-[4.5rem] h-[4.5rem] z-50  justify-center items-center text-4xl hidden hover:text-color-darker transition duration-200 cursor-pointer rounded-md bg-color-blue text-white right-[5rem]`}
      >
        <BsChevronDoubleUp />
      </div>
    </>
  );
};

export default ScrollButton;
