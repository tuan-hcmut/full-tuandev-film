import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      <div className="w-[100%] h-screen flex items-center justify-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
