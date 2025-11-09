import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/state-management/slices/languageSlice";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const dispatch = useDispatch();
  const { locale: currentLocale } = useSelector((state) => state.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
  ];

  const changeLanguage = (newLocale) => {
    setIsOpen(false);
    if (newLocale !== currentLocale) {
      dispatch(setLanguage(newLocale));
      router.push({ pathname, query }, asPath, { locale: newLocale });
    }
  };

  useEffect(() => {
    dispatch(setLanguage(router.locale));
  }, [router.locale, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center text-sm 2xl:text-md gap-2 text-white px-1 md:px-4 py-2 rounded-md transition-colors`}
      >
        <span>{currentLocale?.toUpperCase() || "EN"}</span>
        <Image
          src="/assets/icons/arrow-down.svg"
          alt="Dropdown icon"
          width={14}
          height={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-24 bg-primary text-white rounded-md shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`block w-full text-sm 2xl:text-md text-center px-4 py-2 hover:bg-[#3A1E11] transition-colors`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
