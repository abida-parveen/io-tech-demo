import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const { t } = useTranslation()

  return (
    <React.Fragment>
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
      <div className="min-h-screen bg-gray-50 text-gray-800 py-8">
        <h1 className="text-2xl font-bold mb-4 px-8">
          {t("searchPageResults")}:{" "}
          <span className="text-primary">{query}</span>
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2 px-8">
              {t("labelServices")}
            </h2>
            <p className="text-gray-600 px-8">
              {t("searchPageServiceRelated")}...
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 px-8">
              {t("labelOurTeam")}
            </h2>
            <p className="text-gray-600 px-8">
              {t("searchPageTeamRelated")}...
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default SearchPage;
