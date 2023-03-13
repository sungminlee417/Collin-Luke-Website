import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import Photo from "./Photo";
import "./PhotoModal.css";

const PhotoModal = ({ index, image, current }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const navigationButton = document.querySelector(
        ".navigation-menu-button"
      );
      navigationButton.classList.toggle("hidden");
    }
  }, [showModal]);

  return (
    <>
      <div
        className="carousel-image"
        style={{ backgroundImage: `url(${image})` }}
        alt="collin-and-luke"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal showModal={showModal}>
          <Photo image={image} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default PhotoModal;
