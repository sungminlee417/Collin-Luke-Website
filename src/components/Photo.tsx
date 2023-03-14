import React from "react";
import { MouseEventHandler } from "react";

type Props = {
  image: string;
  onClose: MouseEventHandler;
};

const Photo = ({ image, onClose }: Props) => {
  return (
    <>
      <img
        className="h-screen w-screen object-contain"
        src={`${image}`}
        alt="collin-and-luke"
      />
      <button
        onClick={onClose}
        className="bg-transparent border-none cursor-pointer flex flex-col gap-10 justify-center right-14 fixed top-14 z-20 w-2 h-2"
      >
        <span className="bg-white h-1 absolute w-12 rotate-135"></span>
        <span className="bg-white h-1 absolute w-12 rotate-neg-135"></span>
      </button>
    </>
  );
};

export default Photo;
