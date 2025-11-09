import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ourTeamData } from "../../../../helper/ourTeamData";
import { useTranslation } from "next-i18next";

const OurTeamSection = () => {
  const { t } = useTranslation();

  const swiperRef = useRef(null);

  const handleClick = (step) => {
    step === "prev"
      ? swiperRef.current?.slidePrev()
      : swiperRef.current?.slideNext();
  };

  return (
    <section className="bg-white relative">
      <div className="px-6 lg:px-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            {t("ourTeamTitle")}
          </h2>
          <p className="text-[#1e1e1e] text-lg font-normal">
            {t("ourTeamDescription")}
          </p>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10 h-full"
          >
            {ourTeamData.map((member, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="w-full h-64 relative rounded-sm overflow-hidden">
                    <Image
                      src={member.image}
                      alt={t(member.name)}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <h3 className="text-primary text-xl font-semibold">
                    {t(member.name)}
                  </h3>
                  <p className="text-gray-500 text-sm">{t(member.position)}</p>

                  <div className="flex gap-3 mt-1 justify-center">
                    <a
                      href={`tel:${member.phone}`}
                      className="hover:opacity-80"
                    >
                      <Image
                        src="/assets/icons/phone-call-dark.svg"
                        alt="Phone"
                        width={20}
                        height={20}
                      />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:opacity-80"
                    >
                      <Image
                        src="/assets/icons/mail-dark.svg"
                        alt="Email"
                        width={20}
                        height={20}
                      />
                    </a>
                    <a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      <Image
                        src="/assets/icons/phone-call-dark.svg"
                        alt="WhatsApp"
                        width={20}
                        height={20}
                      />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="absolute top-2/5 -left-4 cursor-pointer"
            onClick={() => handleClick("prev")}
          >
            <Image
              src="/assets/icons/left.svg"
              alt="Previous"
              width={10}
              height={10}
            />
          </button>
          <button
            className="absolute top-2/5 -right-4 cursor-pointer"
            onClick={() => handleClick("next")}
          >
            <Image
              src="/assets/icons/right.svg"
              alt="Next"
              width={10}
              height={10}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
