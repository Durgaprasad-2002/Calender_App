import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { GoogleOAuthProvider } from "@react-oauth/google";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="361544123501-70r7pvg5579sbkun8ls0cicla2nf9vfh.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
