import React, { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

//google auth
import { GoogleOAuthProvider } from "@react-oauth/google";

//redux
import { Provider } from "react-redux";
import store from "./state/store";

//chakra ui
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/chakraui";

//translate
import { I18nextProvider } from "react-i18next"
import i18next from "i18next";
import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"

//render
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

//translation config
i18next.init({
  interpolation: {escapeValue:false},
  lng: "es",
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

root.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        >
          <ChakraProvider theme={theme}>
            <I18nextProvider i18n={i18next}>
              <App />
            </I18nextProvider>
          </ChakraProvider>
        </GoogleOAuthProvider>
      </Provider>
    </Router>
  </StrictMode>
);
