import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import image1 from "../images/IMG_4645.jpg";
import image2 from "../images/IMG_4650.jpeg";
import image3 from "../images/IMG_4651.jpeg";
import image4 from "../images/IMG_4655.jpeg";
import image5 from "../images/IMG_4647.jpeg";
import "./Photos.css";

const images = [image1, image2, image3, image4, image5];

const Photos = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(current - 1);
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

  const handlers = useSwipeable({
    onSwipedLeft: () => prevSlide(),
    onSwipedRight: () => nextSlide(),
  });

  useEffect(() => {
    if (current === 0) {
      setPrev(length - 1);
    } else {
      setPrev(current - 1);
    }
  }, [length, current, prev]);

  return (
    <section className="photos-section content-margin">
      <h3>Photos</h3>
      <div id="photos-carousel-container">
        <div id="photos-carousel-content">
          <button className="carousel-button left-button" onClick={prevSlide}>
            <i className="fa-solid fa-chevron-left fa-3x"></i>
          </button>
          <div {...handlers} id="photos-carousel-images">
            {images.map((image, index) => {
              return (
                <button
                  key={index}
                  className={`image-slide-${index} carousel-slide `}
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  <img
                    className="carousel-image"
                    src={image}
                    alt="collin-and-luke"
                  />
                </button>
              );
            })}
          </div>
          <button className="carousel-button right-button" onClick={nextSlide}>
            <i className="fa-solid fa-chevron-right fa-3x"></i>
          </button>
        </div>
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
                  <img
                    className="images-slider-image"
                    src={images[index]}
                    alt="collin-and-luke"
                  />
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
