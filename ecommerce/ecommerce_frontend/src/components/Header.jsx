import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched categories successfully:", data);
        setCategories(data.results);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="nav-link nav-link-custom me-3" to="/">
          Home
        </Link>

        <ul className="navbar-nav d-flex flex-row">
          {/* Categories - Mega Dropdown */}
          <li className="nav-item dropdown dropdown-hover position-static me-3">
            <Link
              className="nav-link dropdown-toggle nav-link-custom"
              to="#"
              role="button"
              aria-expanded="false"
            >
              Categories
            </Link>
            <div className="dropdown-menu mega-dropdown p-4">
              <div className="row">
                <div className="col-md-4">
                  <h6>Men</h6>
                  <Link className="dropdown-item" to="/category/men/shirts">
                    Shirts
                  </Link>
                  <Link className="dropdown-item" to="/category/men/shoes">
                    Shoes
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/category/men/accessories"
                  >
                    Accessories
                  </Link>
                </div>
                <div className="col-md-4">
                  <h6>Women</h6>
                  <Link className="dropdown-item" to="/category/women/dresses">
                    Dresses
                  </Link>
                  <Link className="dropdown-item" to="/category/women/shoes">
                    Shoes
                  </Link>
                  <Link className="dropdown-item" to="/category/women/bags">
                    Bags
                  </Link>
                </div>
                <div className="col-md-4">
                  <h6>Collections</h6>
                  <Link className="dropdown-item" to="/category/new-arrivals">
                    New Arrivals
                  </Link>
                  <Link className="dropdown-item" to="/category/best-sellers">
                    Best Sellers
                  </Link>
                  <Link className="dropdown-item" to="/category/sale">
                    Sale
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* Products - Dynamic Dropdown */}
          <li className="nav-item dropdown dropdown-hover me-3">
            <Link
              className="nav-link dropdown-toggle nav-link-custom"
              to="#"
              role="button"
              aria-expanded="false"
            >
              Products
            </Link>
            <div className="dropdown-menu mega-dropdown px-3 py-2">
              <div className="d-flex flex-row align-items-center justify-content-start">
                {categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <Link
                      className="dropdown-item px-2"
                      to={`/products/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                    <p>{category.descripttion}</p>
                    {index !== categories.length - 1 && (
                      <span className="text-muted">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </li>

          {/* Other static link */}
          <li className="nav-item">
            <Link className="nav-link nav-link-custom" to="/login">
              Top Deals
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Top Offers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
