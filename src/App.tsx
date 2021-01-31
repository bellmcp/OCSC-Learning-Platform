import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "store/configureStore";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./common/utils/ScrollToTop";
import Layout from "modules/ui/components/Layout";
import META_IMAGE from "./meta.jpg";

const TITLE = "OCSC Learning Platform";
const URL = "http://ocsc-learning-platform.herokuapp.com/";
const DESCRIPTION =
  "เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

const store = configureStore();

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Helmet>
            {/* Primary Meta Tags */}
            <title>{TITLE}</title>
            <meta name="title" content={TITLE} />
            <meta name="description" content={DESCRIPTION} />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={URL} />
            <meta property="og:title" content={TITLE} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:image" content={META_IMAGE} />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={URL} />
            <meta property="twitter:title" content={TITLE} />
            <meta property="twitter:description" content={DESCRIPTION} />
            <meta property="twitter:image" content={META_IMAGE} />
          </Helmet>
          <ScrollToTop />
          <Layout />
        </ConnectedRouter>
      </Provider>
    </HelmetProvider>
  );
}
