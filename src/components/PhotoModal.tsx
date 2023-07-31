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
      <div
        className="h-96 cursor-pointer overflow-hidden mx-auto"
        onClick={() => setShowModal(true)}
      >
        <img
          alt="collin and luke"
          src={image}
          className="h-full w-full object-cover hover:scale-105 transition"
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
