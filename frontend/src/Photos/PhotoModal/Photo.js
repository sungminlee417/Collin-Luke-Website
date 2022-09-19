import "./Photo.css";

const Photo = ({ image, onClose }) => {
  return (
    <>
      <img id="modal-image" src={`${image}`} alt="collin-and-luke" />
      <button
        onClick={() => {
          const navigationButton = document.querySelector(
            ".navigation-menu-button"
          );
          navigationButton.classList.toggle("hidden");
          onClose();
        }}
        className="modal-image-close-button"
      >
        <span className="modal-line-one"></span>
        <span className="modal-line-two"></span>
      </button>
    </>
  );
};

export default Photo;
