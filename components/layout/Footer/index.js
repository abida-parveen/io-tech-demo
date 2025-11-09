import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="bg-primary text-secondary py-10">
      <div className="px-6">
        <div className="flex flex-col md:flex-row items-center justify-between md:justify-end-safe gap-8">
          <div className="flex items-center gap-2 w-full md:w-auto bg-secondary p-1 rounded-md">
            <input
              type="email"
              placeholder="Email"
              className="px-4 rounded-l-md outline-none text-primary w-full md:w-32"
            />
            <button className="bg-primary text-secondary px-4 py-1 rounded-md font-semibold hover:bg-[#3A1E11] hover:text-secondary transition-colors">
              {t("footerSubscribe")}
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/" className="hover:underline">
              {t("footerContact")}
            </Link>
            <div className="flex gap-2">
              <Link href="#">
                <Image
                  src="/assets/icons/github.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/assets/icons/Instagram.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/assets/icons/Linkedin.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-secondary w-full my-8 mx-auto" />

        <div className="md:flex justify-between">
          <div className="flex flex-wrap gap-4 mb-8 text-sm ">
            <Link href="#" className="hover:underline">
              {t("footerAbout")}
            </Link>
            <Link href="#" className="hover:underline">
              {t("footerStrategy")}
            </Link>
            <Link href="#" className="hover:underline">
              {t("footerAdvantages")}
            </Link>
            <Link href="#" className="hover:underline">
              {t("footerResponsibility")}
            </Link>
            <Link href="#" className="hover:underline">
              {t("footerServices")}
            </Link>
          </div>

          <div className="text-xs text-gray-300">
            {t("footerCopyright", { year: new Date().getFullYear() })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
