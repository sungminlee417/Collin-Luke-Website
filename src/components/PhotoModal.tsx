import React, { useState } from "react";
import { Modal } from "../context/Modal";
import Photo from "./Photo";

interface Image {
  image: string;
}

const PhotoModal = ({ image }: Image) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="h-full cursor-pointer" onClick={() => setShowModal(true)}>
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
