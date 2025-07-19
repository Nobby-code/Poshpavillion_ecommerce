import { Link } from "react-router-dom";
import { useCart } from '../pages/CartContext';

import { FaUser, FaShoppingCart, FaPhoneAlt, FaPhone } from "react-icons/fa";

const Navbar = () => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3 py-4 border-bottom">
      <div className="container-fluid">
        {/* Branding */}
        <a className="navbar-brand fw-bold text-dark fs-2" href="/">
          Poshpavillion Fashion Store
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
          <form className="d-flex mx-auto w-50">
            <input
              className="form-control me-2 py-3 fs-4 bg-light"
              type="search"
              placeholder="Search products…"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-primary fw-bold bg-primary text-white px-5 fs-5"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Right side */}
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {/* Help */}
            <li className="nav-item text-secondary small">
              <div>
                <strong>Need Help?</strong>
                <br />
                <a
                  href="tel:+254758543195"
                  className="text-decoration-none text-dark fw-bold fs-5"
                >
                  <FaPhoneAlt />
                  +254 13627939
                </a>
              </div>
            </li>

            {/* My Account */}
            <li className="nav-item">
              <a className="nav-link d-flex align-items-centerv fs-5 px-4" href="#">
                <FaUser className="me-1" /> Log In
              </a>
            </li>

            {/* Cart */}
            <li className="nav-item position-relative">
              <Link to='/cart' className="nav-link d-flex align-items-center fs-5" >
                <FaShoppingCart className="me-1" />
                <span>Cart</span>
                <span className="badge bg-danger ms-1">{totalItems}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Nav Links */}
      {/* <div className="bg-primary text-white py-1 px-3">
        <div className="container d-flex gap-4">
          <a href="#" className="text-white text-decoration-none">Home</a>
          <a href="#" className="text-white text-decoration-none">Categories <span className="badge bg-warning text-dark">SALE</span></a>
          <a href="#" className="text-white text-decoration-none">Products <span className="badge bg-danger">HOT</span></a>
          <a href="#" className="text-white text-decoration-none">Top Deals</a>
          <a href="#" className="text-white text-decoration-none">Top Offers!</a>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
