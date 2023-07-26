import React from "react";

const BouncingArrow = ({ showArrow }: { showArrow: boolean }) => {
  return (
    <div
      className={`absolute bottom-5 left-0 right-0 w-fit m-auto inline-block rounded-full border border-[#660000] bg-[#660000] p-3 text-white animate-bounce z-10 ${
        showArrow ? "opacity-100" : "opacity-0"
      } transition duration-1000`}
    >
      <span className="sr-only">Scroll Down</span>
      <svg
        className="h-5 w-5 rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );
};

export default BouncingArrow;
