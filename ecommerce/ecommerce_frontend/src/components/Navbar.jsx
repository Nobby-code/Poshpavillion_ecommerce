import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { useState } from "react";
import { FaUser, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3 py-3 border-bottom bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Branding */}
        <a className="navbar-brand fw-bold text-dark fs-3" href="/">
          Posh Pavillion Fashion
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <form className="d-flex mx-auto w-100 w-md-75 w-lg-50 my-3 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control me-2 py-2 fs-5 bg-light"
              type="search"
              placeholder="Search products…"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-primary fw-bold px-4 fs-5"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Right side */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3 mt-3 mt-lg-0">
            {/* Help */}
            <li className="nav-item text-secondary small text-center text-lg-start">
              <div>
                <strong>Need Help?</strong>
                <br />
                <a
                  href="tel:+254758543195"
                  className="text-decoration-none text-dark fw-bold fs-6"
                >
                  <FaPhoneAlt className="me-1" />
                  +254 13627939
                </a>
              </div>
            </li>

            {/* My Account */}
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center fs-5 px-3"
                href="#"
              >
                <FaUser className="me-2" /> Log In
              </a>
            </li>

            {/* Cart */}
            <li className="nav-item position-relative">
              <Link
                to="/cart"
                className="nav-link d-flex align-items-center fs-5"
              >
                <FaShoppingCart className="me-2" />
                <span>Cart</span>
                <span className="badge bg-danger ms-2">{totalItems}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;