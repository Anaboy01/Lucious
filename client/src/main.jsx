import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";
import { ProductProvider } from "./context/ProductContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ProductProvider>
        <BrowserRouter>
          <App />

          <ToastContainer />
        </BrowserRouter>
      </ProductProvider>
    </AppProvider>
  </StrictMode>
);
