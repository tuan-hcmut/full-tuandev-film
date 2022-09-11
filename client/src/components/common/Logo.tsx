import React from "react";

const Logo: React.FC = () => {
  return (
    <>
      <a
        href={`${process.env.REACT_APP_URL}`}
        className=" flex items-center gap-7"
      >
        <img
          className="w-[4rem] h-[4rem] rounded-full bg-cyan-500 "
          src="/logo1.png"
          alt="logo"
        />
        <div className="typed-animation">
          <h1 className="typed-out bg-text-color">Tuan Dev</h1>
        </div>
      </a>
    </>
  );
};

export default Logo;
