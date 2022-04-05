import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { CookiesProvider } from "react-cookie";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);
