import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({ showModal, onClose, children }) => {
  if (!showModal) return null;

  return ReactDOM.createPortal(
    <>
      <div id="modal-background" />
      <div id="modal">
        <div id="modal-content">{children}</div>
      </div>
      <button id="modal-exit-button" onClick={onClose}>
        <i class="fa-solid fa-x fa-2x"></i>
      </button>
    </>,
    document.getElementById("image-portal")
  );
};

export default Modal;
