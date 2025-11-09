import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { testimonialsData } from "../../../../helper/testimonialData";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ClientTestimonials = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const swiperRef = useRef(null);
  const [beginning, setBeginning] = useState(true);
  const [endding, setEndding] = useState(false);

  const isArabic = useMemo(() => locale === "ar", [locale]);

  const handleClick = (step) => {
    step === "prev"
      ? swiperRef.current?.slidePrev()
      : swiperRef.current?.slideNext();
  };

  return (
    <div className="bg-primary py-20 px-6 md:px-20 lg:px-32 relative">
      <div className="max-w-3xl mb-12">
        <h2 className="text-md md:text-2xl lg:text-4xl font-bold text-secondary mb-4">
          {t("clientHeadline")}
        </h2>
        <p className="text-secondary text-sm md:text-lg font-normal">
          {t("clientDescription")}
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        className="w-full"
        onSlideChange={(current) => {
          setBeginning(current.isBeginning);
          setEndding(current.isEnd);
        }}
      >
        {testimonialsData.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden">
              <div className="w-full lg:w-1/3 h-72 lg:h-96 relative shrink-0">
                <Image
                  src={testimonial.userImage}
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>

              <div className="w-full lg:w-2/3 flex flex-col justify-between py-4 lg:py-2 lg:px-8 text-justify">
                <div>
                  <p className="text-secondary font-normal text-sm md:text-lg leading-relaxed mb-2 md:mb-0">
                    {t(testimonial.feedback)}
                  </p>
                </div>

                <div className="mt-8 lg:mt-0">
                  <h4 className="text-secondary text-sm md:text-md font-semibold">
                    {t(testimonial.name)}
                  </h4>
                  <p className="text-secondary text-xs md:text-sm font-normal">
                    {t(testimonial.position)}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`flex gap-4 absolute bottom-10 md:bottom-0 ${
          isArabic ? "left-6 md:left-20 flex-row-reverse" : "right-6 md:right-20"
        }`}
      >
        <button
          className={`p-3 rounded-full shadow-md transition bg-secondary
    ${beginning ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100"}`}
          onClick={() => handleClick("prev")}
          disabled={beginning}
        >
          <Image
            src="/assets/icons/arrow-left.svg"
            alt="Previous"
            width={20}
            height={20}
          />
        </button>

        <button
          className={`p-3 rounded-full shadow-md transition bg-secondary
    ${endding ? "opacity-60 cursor-not-allowed" : " hover:bg-gray-100"}`}
          onClick={() => handleClick("next")}
          disabled={endding}
        >
          <Image
            src="/assets/icons/arrow-right.svg"
            alt="Next"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default ClientTestimonials;
