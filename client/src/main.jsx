import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";
import { ProductProvider } from "./context/ProductContext";
import { WishProvider } from "./context/WishContext";
import { CartProvider } from "./context/CartContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ProductProvider>
        <WishProvider>
          <CartProvider>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
          </CartProvider>
        </WishProvider>
      </ProductProvider>
    </AppProvider>
  </StrictMode>
);
