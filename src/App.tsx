//@ts-nocheck
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from 'store/configureStore';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from 'utils/ScrollToTop';
import Layout from 'modules/ui/components/Layout';
import META_IMAGE from './meta.jpg';

const TITLE = 'OCSC Learning Space';
const URL = process.env.REACT_APP_PLATFORM_URL;
const DESCRIPTION =
  'โลกแห่งการเรียนรู้ ไม่มีวันจบสิ้น ยิ่งเรียนยิ่งรู้ ยิ่งเพิ่มพลังทางปัญญา';

const store = configureStore();

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Helmet>
            <title>{TITLE}</title>
            <meta name="title" content={TITLE} />
            <meta name="description" content={DESCRIPTION} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={URL} />
            <meta property="og:title" content={TITLE} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:image" content={META_IMAGE} />
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
