import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (slug) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/?category__slug=${slug}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data.results || data))
        .catch((err) => console.error(err));
    }
  }, [slug]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-capitalize text-center">
        Products in "{slug}" Category
      </h2>
      <div className="row g-4">
        {products.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
            key={product.id}
          >
            <div className="card shadow-sm w-100">
              <img
                src={`https://res.cloudinary.com/dxwc7cm3b/${product.image}`}
                alt={product.name}
                className="card-img-top img-fluid"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold text-primary">Ksh {product.price}</p>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;