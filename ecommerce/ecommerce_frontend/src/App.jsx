import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryList from "./pages/CategoryList";
import Carousel from "./pages/Carousel";
import OrderSuccess from "./pages/OrderSuccess";
import ProductList from "./components/ProductList";
import SearchResults from "./components/SearchResults";
import ProductsByCategory from "./pages/ProductsByCategory";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Header />
      <main>
        {/* <CategoryList /> */}
        {/* <Carousel /> */}
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Carousel />
                  <Home />
                </>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            {/* <Route path="/products" element={<ProductList />} /> */}
            <Route path="/search" element={<SearchResults />} />
            {/* <Route path="/products/:categorySlug?" element={<ProductList />} /> */}
            <Route
              path="/products/:categoryName"
              element={<ProductsByCategory />}
            />
          </Routes>
        </div>
      </main>
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/254713627939" // Replace with your WhatsApp number
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <i className="fab fa-whatsapp whatsapp-icon"></i> */}
        <FaWhatsapp className="whatsapp-icon" />
      </a>
      <Footer />
    </Router>
  );
}

export default App;
