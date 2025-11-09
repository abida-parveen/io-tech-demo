import React, { useEffect } from "react";
import { useRouter } from "next/router";
const MainLayout = (props) => {
  const { locale } = useRouter();

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  const { children } = props;

  return typeof window !== "undefined" ? (
    <div>{children}</div>
  ) : (
    <div>Loading...</div>
  );
};

export default MainLayout;
