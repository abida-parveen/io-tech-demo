import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/state-management/slices/searchSlice";
import { useTranslation } from "next-i18next";

const NavbarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation()

  const query = useSelector((state) => state.search.query);

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 transition-all hover:opacity-80"
        >
          <Image
            src="/assets/icons/search.svg"
            alt="Search"
            width={15}
            height={15}
            className="cursor-pointer"
          />
        </button>
      )}

      {isOpen && (
        <div className="relative flex items-center bg-secondary rounded-md px-3 py-1 transition-all duration-300 ease-in-out">
          <input
            type="text"
            placeholder={`${t("labelSearch")}`}
            value={query}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onKeyDown={handleKeyDown}
            autoFocus
            className="bg-secondary text-primary placeholder:text-primary/70 px-2 py-1 w-16 rounded-md outline-none"
          />
          <button onClick={handleSearch} className="p-1 ml-2">
            <Image
              src="/assets/icons/search.svg"
              alt="Search"
              width={15}
              height={15}
              className="cursor-pointer invert"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
