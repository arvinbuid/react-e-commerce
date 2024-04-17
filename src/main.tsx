import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProductProvider from "./contexts/ProductContext";
import SidebarContext from "./contexts/SidebarContext";
import CartContext from "./contexts/CartContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SidebarContext>
    <CartContext>
      <ProductProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductProvider>
    </CartContext>
  </SidebarContext>
);
