import React, { useState } from "react";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
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
import image6 from "../images/IMG_4657.jpeg";

import PhotoModal from "./PhotoModal";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const images = [image1, image2, image3, image4, image5, image6];

const Photos = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <section className="photos-section flex flex-col gap-14 md:m-20 m-12">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Photos</h2>
      <div className="flex flex-col gap-10">
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#373b3e",
            } as React.CSSProperties
          }
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="lg:h-224 md:h-144 h-96 object-contain w-full"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <PhotoModal image={image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          onSwiper={(swiper: SwiperCore) => setThumbsSwiper(swiper)}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          className="images-slider w-full lg:h-36 md:h-28 h-16"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index} className="swiper-slide">
                <div
                  className="h-full cursor-pointer"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <img
                    alt="collin and luke"
                    src={image}
                    className="h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Photos;
