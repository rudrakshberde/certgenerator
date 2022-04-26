import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FileUploader from "./FileUpload";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();