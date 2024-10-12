import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PropertyProvider } from "./components/context/PropertyContext";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PropertyProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PropertyProvider>
      </Provider>
    </React.StrictMode>
  );
}
