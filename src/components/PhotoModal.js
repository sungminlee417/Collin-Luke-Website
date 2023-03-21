import { useState } from "react";
import { Modal } from "../context/Modal";
import Photo from "./Photo";

const PhotoModal = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="h-full cursor-pointer"
        alt="collin-and-luke"
        onClick={() => setShowModal(true)}
      >
        <img
          alt="collin and luke"
          src={image}
          className="object-cover h-full m-auto"
        />
      </div>
      {showModal && (
        <Modal showModal={showModal}>
          <Photo image={image} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default PhotoModal;
