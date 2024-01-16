import React from "react";
import PhotoModal from "./PhotoModal";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation } from "swiper";

const image1 =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-1.jpeg";
const image7 =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-7.jpeg";
const image8 =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-8.jpeg";
const image11 =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-11.jpeg";
const image14 =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-14.jpg";
const image15 =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-15.jpg";

const images = [
  image1,
  image7,
  image8,
  image11,
  image14,
  image15,
];

const Photos = () => {
  return (
    <section className="photos-section flex flex-col gap-6 md:m-20 m-12">
      <h2 className="text-3xl tracking-tight sm:text-4xl text-center">
        Gallery
      </h2>
      <div className="flex flex-col gap-2">
        <Swiper
          modules={[Navigation]}
          style={
            {
              "--swiper-navigation-color": "#66000",
            } as React.CSSProperties
          }
          loop={true}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          className="object-contain w-full"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <PhotoModal image={image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Photos;
