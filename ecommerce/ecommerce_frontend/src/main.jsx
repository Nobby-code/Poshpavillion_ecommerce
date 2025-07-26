import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Includes dropdown behavior
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./pages/CartContext.jsx";
import { ToastProvider } from "./components/ToastContext.jsx";
// import { ToastProvider } from './components/ToastContext';
// import './bootstrap.min.css'; // Ensure Bootstrap styles are applied

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </StrictMode>
);
