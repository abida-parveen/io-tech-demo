import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const SlideContent = ({
  type,
  mediaSrc,
  headlineKey,
  descKey,
  link,
  userImage,
}) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const isArabic = locale === "ar";

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {type === "video" ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={mediaSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt="Slide background"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div
        className={`absolute inset-0 z-10 bg-linear-to-r from-primary/90 to-primary/40`}
      />

      <div
        className={`relative z-20 flex flex-col-reverse lg:flex-row items-center justify-evenly lg:justify-between w-full h-full px-6 md:px-12 lg:px-16 py-6 lg:py-0 pt-24`}
      >
        <div
          className={`w-full lg:w-1/2 text-white ${
            isArabic ? "text-right" : "text-left"
          } space-y-4 md:space-y-6 order-2 lg:order-1`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {t(headlineKey)}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
            {t(descKey)}
          </p>
          <Link href={link}>
            <button className="mt-4 bg-white text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-all">
              {t("buttonReadMore")}
            </button>
          </Link>
        </div>

        <div
          className={`w-full lg:w-1/2 flex justify-center lg:justify-end lg:mb-0 order-1 lg:order-2`}
        >
          <div className="relative w-[90vw] sm:w-[375px] md:w-[375px] max-w-[375px] aspect-square">
            <Image
              src={userImage}
              alt="User image"
              fill
              className="object-cover rounded-lg shadow-lg bg-primary"
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 375px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
