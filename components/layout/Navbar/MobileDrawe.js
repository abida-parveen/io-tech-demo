import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const MobileDrawer = ({ isOpen, setIsOpen, navbarData }) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleAccordion = (idx) => {
    setActiveAccordion((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      className={`fixed top-0 ${
        locale === "ar" ? "left-0" : "right-0"
      } h-full bg-primary text-white w-full sm:w-[90vw] z-50 transform transition-transform duration-300 ${
        locale === "ar"
          ? isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          : isOpen
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div className="relative h-full flex flex-col justify-between px-6 py-6 z-50">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={100}
              height={50}
              className="bg-secondary rounded-md"
            />
          </Link>

          <button onClick={() => setIsOpen(false)}>
            <Image
              src="/assets/icons/close.svg"
              alt="Close"
              width={22}
              height={22}
            />
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {navbarData.map((item, idx) => (
            <li key={idx}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="flex justify-between items-center w-full text-left font-semibold"
                  >
                    {t(item.key)}
                    <Image
                      src="/assets/icons/arrow-down.svg"
                      alt="arrow"
                      width={16}
                      height={16}
                      className={`transition-transform duration-200 ${
                        activeAccordion === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden rounded-md bg-[#201009] transition-all duration-300 ${
                      activeAccordion === idx
                        ? "max-h-[35vh] mt-2 overflow-y-auto py-2 px-4"
                        : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-2 pl-4 text-sm">
                      {item.subMenu?.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="hover:text-secondary"
                        >
                          {t(subItem.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-semibold hover:text-secondary"
                >
                  {t(item.key)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link href="#appointment" onClick={() => setIsOpen(false)}>
          <button className="w-full hover:bg-transparent hover:text-secondary border-2 border-secondary bg-secondary text-primary font-semibold py-3 rounded-md mt-6">
            {t("buttonBookAppointment")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MobileDrawer;
