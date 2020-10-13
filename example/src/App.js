import "base-app/index.css";
import React, { lazy, Suspense, useEffect } from "react";

import {
  HttpClient,
  FallbackSpinner,
  FormattedMessage,
  useDeviceDetect,
  AppId,
} from "base-app"


import { createBrowserHistory } from "history";
export let history = createBrowserHistory({ basename: "" });

const App = () => {
  // Check is mobile
  const { isMobile } = useDeviceDetect();
  const message = {
    en: {
      AppName : 'Home'
    },
    vi: {
      AppName : 'Trang chủ'
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  // Using Http Client
  const fetchApi = async () => {
    const res = await HttpClient.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
  };

  const BaseApp = lazy(() => import("./BasePage"));

  return (
    <Suspense fallback={<FallbackSpinner />}>
      <BaseApp
        history={history}
        message={message}
        appId={AppId.HOME}
      >
        {/* Example Using translate text with format */}
        <FormattedMessage id={`${AppId.HOME}.AppName`} />
      </BaseApp>
    </Suspense>
  );
};

export default App;
