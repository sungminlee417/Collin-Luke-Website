import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProviderProps = {
  children: React.ReactNode;
  showModal?: boolean;
};

const ModalContext = React.createContext<HTMLElement | null>(null);

export function ModalProvider({ children }: ModalProviderProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setValue(modalRef.current || null);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ children }: ModalProviderProps) {
  const modalNode = useContext(ModalContext);

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
