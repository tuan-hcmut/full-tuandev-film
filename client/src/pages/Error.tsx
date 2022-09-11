import React from "react";

const Error: React.FC = () => {
  return (
    <>
      <title>Page not found</title>
      <div className="w-[100%] h-screen flex items-center justify-center text-4xl text-red-500 font-medium">
        Page Not Found!!! 404
      </div>
    </>
  );
};

export default Error;
