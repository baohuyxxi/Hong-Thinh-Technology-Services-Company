import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/css/grid.scss";
import "./assets/css/frame.scss";
import "./assets/css/index.scss";
import "./assets/css/responsive.scss";

import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          style={{ fontSize: "14px" }}
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
);
