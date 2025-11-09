import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("@/layout/MainLayout"), {
  ssr: false,
});

import "../styles/globals.css";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import store from "@/state-management/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <div>
      <Head>
        <link rel="shortcut icon" href="/next.svg" />
        <title>IOTech</title>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
    </Provider>
  );
}


export default appWithTranslation(MyApp);
