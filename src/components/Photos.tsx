import React from "react";
import PhotoModal from "./PhotoModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { InstagramEmbed } from "react-social-media-embed";

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

const images = [image1, image7, image8, image11, image14, image15];

const Photos = () => {
  return (
    <section className="photos-section flex flex-col xl:flex-row items-center md:m-20 m-12 gap-8 xl:gap-5 justify-between">
      <div className="flex flex-col gap-6 xl:w-3/5 w-full">
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
              1024: {
                slidesPerView: 2,
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
      </div>
      <div className="border-l border-gray-300 xl:h-96 mx-4" />
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl tracking-tight sm:text-4xl text-center">
          Follow us on Instagram
        </h2>
        <InstagramEmbed
          url="https://www.instagram.com/muse__duo/"
          width='100%'
        />
      </div>
    </section>
  );
};

export default Photos;
