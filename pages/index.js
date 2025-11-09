import React from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeroSection from "@/layout/HeroSection";
import OurTeamSection from "../components/main/home/ourTeamSection";
import ClientTestimonials from "../components/main/home/clientsTestimonials";

const Home = (props) => {

  return (
    <React.Fragment>
      <Navbar />
      <HeroSection />
      <OurTeamSection />
      <ClientTestimonials />
      <Footer />
    </React.Fragment>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
