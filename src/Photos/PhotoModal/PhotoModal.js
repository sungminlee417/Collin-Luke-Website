import { useState } from "react";
import { Modal } from "../../context/Modal";
import Photo from "../../components/Photo";
import "./PhotoModal.css";

const PhotoModal = ({ index, image, current }) => {
  const [showModal, setShowModal] = useState(false);

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
