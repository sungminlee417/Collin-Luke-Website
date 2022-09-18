import "./Photo.css";

const Photo = ({ image }) => {
  return <img id="modal-image" src={`${image}`} alt="collin-and-luke" />;
};

export default Photo;
