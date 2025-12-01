import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./css/Qy.css";
import "./css/style.css";
import "./css/satoshi.css";
import "./css/sweetalert2-dark.css";
import "./css/sweetalert2-light.css";
// import "jsvectormap/dist/css/jsvectormap.css"; // CSS file not found in package
import "flatpickr/dist/flatpickr.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { DefaultProvider } from "./Context/DefaultContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <BrowserRouter>

  <Provider store={store}>
    <DefaultProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </DefaultProvider>
  </Provider>
  // </BrowserRouter>,
);
