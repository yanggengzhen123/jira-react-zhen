import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import 'antd/dist/antd.less';
import { AppProviders } from "context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
loadDevTools(() => {
  root.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  );
});
reportWebVitals();
