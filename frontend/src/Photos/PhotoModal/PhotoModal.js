import { useState } from "react";
import { Modal } from "../../context/Modal";
import Photo from "./Photo";
import "./PhotoModal.css";

const PhotoModal = ({ index, image, images, current }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={
          index === current
            ? `image-slide-${index} carousel-slide active`
            : `image-slide-${index} carousel-slide `
        }
        onClick={() => setShowModal(true)}
      >
        <img className="carousel-image" src={image} alt="collin-and-luke" />
      </button>
      {showModal && (
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <Photo image={image} />
        </Modal>
      )}
    </>
  );
};

export default PhotoModal;
