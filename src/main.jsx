import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./theme";
import "./i18n";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>
<ThemeProvider theme={theme}>
<GlobalStyle />
<BrowserRouter>
<App />
</BrowserRouter>
</ThemeProvider>
</React.StrictMode>
);