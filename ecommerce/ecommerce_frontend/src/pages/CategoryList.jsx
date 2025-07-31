import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // fetch("http://127.0.0.1:8000/api/categories/")
    // fetch(`${import.meta.env.VITE_API_BASE_URL}/categories/`)
    fetch(`${import.meta.env.VITE_API_BASE_URL}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched categories successfully:", data);
        setCategories(data.results);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="row">
      {categories.map((category) => (
        <div className="col-md-4 mb-4" key={category.id}>
          <div className="row">
            <div className="col-md-4">
              <Link className="dropdown-item" to="/category/men/shirts">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text text-muted">{category.description}</p>
              </Link>
              <Link className="dropdown-item" to="/category/men/shoes">
                <p className="card-text text-muted">{category.name} for babies</p>
              </Link>
              <Link className="dropdown-item" to="/category/men/accessories">
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
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
              <p className="card-text text-muted">{category.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
