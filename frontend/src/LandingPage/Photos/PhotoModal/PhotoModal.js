import { useState } from "react";
import Modal from "../../../context/Modal";
import Photo from "./Photo/Photo";
import "./PhotoModal.css";

const PhotoModal = ({ index, currentImage, images, setCurrent, current }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        key={index}
        className={
          index === currentImage ? "carousel-slide active" : "carousel-slide "
        }
        onClick={() => setShowModal(true)}
      >
        {index === currentImage && (
          <img
            className="carousel-image"
            src={images[currentImage]}
            alt="collin-and-luke"
          />
        )}
      </button>
      {showModal && (
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <Photo setCurrent={setCurrent} images={images} current={current} />
        </Modal>
      )}
    </>
  );
};

export default PhotoModal;
