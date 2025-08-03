import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.results);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">MyShop</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* PRODUCTS: Static Mega Dropdown */}
            <li className="nav-item dropdown dropdown-hover">
              <button
                className="nav-link dropdown-toggle nav-link-custom btn btn-link"
                data-bs-toggle="dropdown"
              >
                Products
              </button>
              <div className="dropdown-menu mega-dropdown p-4 shadow border">
                <div className="row">
                  <div className="col-md-4">
                    <h6>Men</h6>
                    <Link className="dropdown-item" to="/category/men/shirts">Shirts</Link>
                    <Link className="dropdown-item" to="/category/men/shoes">Shoes</Link>
                    <Link className="dropdown-item" to="/category/men/accessories">Accessories</Link>
                  </div>
                  <div className="col-md-4">
                    <h6>Women</h6>
                    <Link className="dropdown-item" to="/category/women/dresses">Dresses</Link>
                    <Link className="dropdown-item" to="/category/women/shoes">Shoes</Link>
                    <Link className="dropdown-item" to="/category/women/bags">Bags</Link>
                  </div>
                  <div className="col-md-4">
                    <h6>Collections</h6>
                    <Link className="dropdown-item" to="/category/new-arrivals">New Arrivals</Link>
                    <Link className="dropdown-item" to="/category/best-sellers">Best Sellers</Link>
                    <Link className="dropdown-item" to="/category/sale">Sale</Link>
                  </div>
                </div>
              </div>
            </li>

            {/* CATEGORIES: Dynamic Mega Dropdown */}
            {categories.length > 0 && (
              <li className="nav-item dropdown dropdown-hover">
                <button
                  className="nav-link dropdown-toggle nav-link-custom btn btn-link"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </button>
                <div className="dropdown-menu mega-dropdown px-4 py-4 shadow border">
                  <div className="row">
                    {categories.map((category) => (
                      <div className="col-md-4 mb-3" key={category.id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${category.slug}`}
                        >
                          <h6>{category.name}</h6>
                          <p className="text-muted small mb-0">
                            {category.description?.length > 60
                              ? category.description.slice(0, 60) + "..."
                              : category.description}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/login">Top Deals</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaBars /> Top Offers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;