import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);

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
            {/* <Link
              className="nav-link dropdown-toggle nav-link-custom"
              to="#"
              role="button"
              aria-expanded="false"
            >
              Categories
            </Link> */}
            <button
              className="nav-link dropdown-toggle nav-link-custom btn btn-link"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </button>
            <div className="dropdown-menu mega-dropdown p-4 shadow border">
              <div className="row py-4">
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
            <div className="dropdown-menu mega-dropdown px-3 py-5 shadow border">
              <div className="d-flex flex-row align-items-center justify-content-start ">
                {categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <Link
                      className="dropdown-item px-2"
                      to={`/products/${category.slug}`}
                      // to={`/products/${category.name.toLowerCase()}`}
                    >
                      <div>
                        <h4>{category.name}</h4>

                        {/* {category.description} */}
                        <p className="text-muted small mb-0">
                          {category.description.length > 60
                            ? `${category.description.slice(0, 60)}...`
                            : category.description}
                          {index !== categories.length - 1 && (
                            <span className="text-muted">|</span>
                          )}
                        </p>
                      </div>
                      {/* {index !== categories.length - 1 && (
                        <span className="text-muted">|</span>
                      )} */}
                    </Link>
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
          <li className="nav-item" style={{ www: "20px" }}>
            <Link className="nav-link" to="/cart">
              <FaBars />Top Offers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    // <Navbar bg="light" expand="lg">
    //   {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="me-auto">
    //       <Nav.Link href="/">Home</Nav.Link>
    //       <Nav.Link href="/product">Products</Nav.Link>
    //       <NavDropdown title="Categories" id="basic-nav-dropdown">
    //         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.2">
    //           Another action
    //         </NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //         <NavDropdown.Divider />
    //         <NavDropdown.Item href="#action/3.4">
    //           Separated link
    //         </NavDropdown.Item>
    //       </NavDropdown>
    //       <Nav.Link href="/product">Top deals</Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
};

export default Header;
