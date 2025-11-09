import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { serviceData } from "../../helper/serviceData";
import Navbar from "@/layout/Navbar";
import Image from "next/image";
import Footer from "@/layout/Footer";

const ServicePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation("common");

  if (!slug || !serviceData[slug]) return <p>Service not found</p>;

  const service = serviceData[slug];

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-[30vh]">
        <Image
          src="/assets/general-image.webp"
          alt="General banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="px-6 lg:px-32 py-16">
        <h1 className="text-4xl font-bold text-primary mb-6">
          {t(service.headline)}
        </h1>

        <p className="text-[#1e1e1e] mb-6">{t(service.intro)}</p>

        {service.sections &&
          service.sections.map((sec, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {t(sec.title)}
              </h2>
              <p className="text-[#1e1e1e] mb-2">{t(sec.paragraph)}</p>
              {sec.list && (
                <ul className="list-disc list-inside text-[#1e1e1e]">
                  {sec.list.map((item, i) => (
                    <li key={i}>{t(item)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        {service.conclusion && (
          <p className="text-[#1e1e1e] mt-6">{t(service.conclusion)}</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export const getStaticPaths = async () => {
  const paths = Object.keys(serviceData).map((slug) => ({
    params: { slug },
    locale: "en",
  }));

  Object.keys(serviceData).forEach((slug) => {
    paths.push({ params: { slug }, locale: "ar" });
  });

  return { paths, fallback: false };
};

export default ServicePage;
