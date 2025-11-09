import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SlideContent from "./SlideContent";
import slideData from "../../../helper/slideData";

const HeroSection = () => {
  return (
    <div className="h-[90vh] lg:h-screen">
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        slidesPerView={1}
        loop={true}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideContent
              type={slide.type}
              mediaSrc={slide.mediaSrc}
              headlineKey={slide.headlineKey}
              descKey={slide.descriptionKey}
              link={slide.link}
              userImage={slide.userImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
