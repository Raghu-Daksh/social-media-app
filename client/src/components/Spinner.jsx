import React from "react";
import  Loader from "react-loader-spinner";

const Spinner = ({message}) => {
  return (
    <div className="flex justify-center items-center flex-col w-ful  h-full">
      <Loader 
        type="Circles"
        color="#00BFFF"
        height={50}
        width={200}
        className="m-5"
      />
      <p className="text-lg text-center px-2"> {message}</p>
    </div>
  );
};

export default Spinner;
