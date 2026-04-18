import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import { RouterProvider } from "./lib/router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </RouterProvider>
  </StrictMode>,
)
