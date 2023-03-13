import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ children, type }) {
  const modalNode = useContext(ModalContext);

  useEffect(() => {
    const html = document.querySelector("html");
    html.style.overflow = "hidden";
    return () => (html.style.overflow = "auto");
  }, []);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div
      id="modal"
      className="fixed top-0 right-0 left-0 bottom-0 flex content-center items-center z-30 h-screen w-screen overflow-hidden"
    >
      <div
        id="modal-background"
        className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.85)]"
      />
      <div className="modal-content h-full relative">{children}</div>
    </div>,
    modalNode
  );
}
