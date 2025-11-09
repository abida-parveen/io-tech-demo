import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import LanguageSwitcher from "@/layout/Navbar/LanguageSwitcher";
import { navbarData } from "../../../helper/navbarData";
import NavbarDropdown from "./NavbarDropdown";
import NavbarSearch from "./NavbarSearch";
import MobileDrawer from "./MobileDrawe";

const Navbar = () => {
  const { t } = useTranslation("common");
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
  }, [isDrawerOpen]);

  return (
    <nav
      className={`w-full transition-all duration-300 z-50 ${
        scrolled
          ? "fixed top-0 left-0 bg-primary shadow-md"
          : "absolute top-0 left-0 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 md:px-6 py-2">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="bg-secondary rounded-md"
          />
        </Link>

        <ul className="hidden lg:flex gap-8 text-white font-sm">
          {navbarData.map((item, idx) => (
            <li key={idx}>
              {item.hasDropdown ? (
                <NavbarDropdown item={item} />
              ) : (
                <Link href={item.href} className="hover:underline">
                  {t(item.key)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 md:gap-2">
          <NavbarSearch />
          <LanguageSwitcher />
          <Link href="#appointment">
            <button className="border-white text-white hover:bg-secondary hover:text-primary px-4 py-2 border-2 rounded-md text-sm 2xl:text-md font-semibold transition-all hidden lg:block">
              {t("buttonBookAppointment")}
            </button>
          </Link>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="block lg:hidden text-white focus:outline-none"
          >
            <Image
              src="/assets/icons/bars-solid.svg"
              alt="menu"
              width={15}
              height={15}
            />
          </button>
        </div>
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        navbarData={navbarData}
      />
    </nav>
  );
};

export default Navbar;
