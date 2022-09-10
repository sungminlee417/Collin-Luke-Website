import { useState } from "react";
import image1 from "../../images/IMG_4645.jpg";
import image2 from "../../images/IMG_4650.jpeg";
import image3 from "../../images/IMG_4651.jpeg";
import image4 from "../../images/IMG_4655.jpeg";
import PhotoModal from "./PhotoModal";
import "./Photos.css";

const images = [image1, image2, image3, image4];

const Photos = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const selectImage = (index) => {
    setCurrent(index);
  };

  return (
    <section id="photos-section">
      <div id="photos-carousel-container">
        <button className="carousel-button left-button" onClick={prevSlide}>
          <i className="fa-solid fa-chevron-left fa-2x"></i>
        </button>
        {images.map((image, index) => {
          return (
            <PhotoModal
              index={index}
              currentImage={current}
              images={images}
              setCurrent={setCurrent}
              current={current}
            />
          );
        })}
        <button className="carousel-button right-button" onClick={nextSlide}>
          <i className="fa-solid fa-chevron-right fa-2x"></i>
        </button>
        <ul id="images-slider">
          {images.map((image, index) => {
            return (
              <li key={index} className="images-slider-image-container">
                <button
                  onClick={() => selectImage(index)}
                  className={
                    index === current
                      ? "images-slide-button active"
                      : "images-slide-button"
                  }
                >
                  <img className="images-slider-image" src={images[index]} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Photos;
