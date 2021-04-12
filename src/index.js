import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import History from './history';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
ReactDOM.render(
  <React.StrictMode>
    <Router history={History}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
