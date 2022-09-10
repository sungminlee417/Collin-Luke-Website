import "./Photo.css";

const Photo = ({ setCurrent, images, current }) => {
  const image = images[current];
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  return (
    <>
      <button className="photo-modal-arrows" onClick={prevSlide}>
        <i class="fa-solid fa-arrow-left fa-10x"></i>
      </button>
      <img id="image-modal-image" src={image} alt="collin-and-luke" />
      <button className="photo-modal-arrows" onClick={nextSlide}>
        <i class="fa-solid fa-arrow-right fa-10x"></i>
      </button>
    </>
  );
};

export default Photo;
