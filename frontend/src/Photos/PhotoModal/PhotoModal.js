import { useState } from "react";
import Modal from "../../context/Modal";
// import Photo from "./Photo/Photo";
import "./PhotoModal.css";

const PhotoModal = ({ index, image, images, current }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    // <>
    <button
      className={
        index === current
          ? `image-slide-${index} carousel-slide active`
          : `image-slide-${index} carousel-slide `
      }
    >
      <img className="carousel-image" src={image} alt="collin-and-luke" />
    </button>
    //   {showModal && (
    //     <Modal showModal={showModal} onClose={() => setShowModal(false)}>
    //       {/* <Photo setCurrent={setCurrent} images={images} current={current} /> */}
    //     </Modal>
    //   )}
    // </>
  );
};

export default PhotoModal;
