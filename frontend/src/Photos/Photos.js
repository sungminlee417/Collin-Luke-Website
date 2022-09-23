import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import image1 from "../images/IMG_4645.jpg";
import image2 from "../images/IMG_4650.jpeg";
import image3 from "../images/IMG_4655.jpeg";
import image4 from "../images/IMG_4647.jpeg";
import image5 from "../images/IMG_4649.jpeg";
import "./Photos.css";
import PhotoModal from "./PhotoModal/PhotoModal";

const images = [image1, image2, image3, image4, image5];

const Photos = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="photos-section content-margin">
      <h3>Photos</h3>
      <div className="photos-content">
        <Swiper
          style={{
            "--swiper-navigation-color": "#373b3e",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="photos-carousel-images"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index} className={"carousel-slide"}>
                <PhotoModal image={image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="images-slider"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index} className={"slider-slide"}>
                <div
                  className="carousel-image"
                  style={{ backgroundImage: `url(${image})` }}
                  alt="collin-and-luke"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Photos;
