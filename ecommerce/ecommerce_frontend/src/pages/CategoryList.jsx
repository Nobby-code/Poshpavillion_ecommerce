import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
              <p className="card-text text-muted">{category.description}</p>
              <Link to={`/category/${category.slug}`} className="btn btn-primary mt-3">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;