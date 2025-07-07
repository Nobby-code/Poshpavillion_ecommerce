import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid d-flex justify-content-between me-auto">
        <Link className="nav-link me-3" to="/">
          Home
        </Link>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item me-3">
            <Link className="nav-link" to="/cart">
              Categories
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link" to="/login">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Top Deals
            </Link>
          </li>
        </ul>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Top Offers
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
