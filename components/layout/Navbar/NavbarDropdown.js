import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const NavbarDropdown = ({ item }) => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:underline"
      >
        {t(item.key)}
        <Image
          src="/assets/icons/arrow-down.svg"
          alt="Dropdown"
          width={14}
          height={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-full -mt-1 bg-primary text-secondary p-6 rounded-md shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[90vw] z-50`}
        >
          {item.subMenu.map((sub, idx) => (
            <Link
              key={idx}
              href={sub.href}
              className="hover:text-white transition-colors text-sm 2xl:text-md font-medium"
              onClick={() => setIsOpen(!isOpen)}
            >
              {t(sub.key)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
