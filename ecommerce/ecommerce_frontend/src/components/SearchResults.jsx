import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductSkeletonCard from "./ProductSkeletonCard";

import { ProductContext } from "../context/ProductContext";
import { useCart } from "../pages/CartContext";
import { useToast } from "./ToastContext"; // ✅ Import useToast hook
// import { debounce } from "../utils/debounce";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState(null);
  const { showToast } = useToast();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/products/?search=${searchQuery}`)
        .then((res) => {
          setProducts(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Search Results for: "{searchQuery}"</h2>

      {loading ? (
        <div className="row">
          {[...Array(6)].map((_, i) => (
            <ProductSkeletonCard key={i} />
          ))}
        </div>
      ) : Array.isArray(products) && products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 d-flex flex-column">
                <img
                  src={`https://res.cloudinary.com/dxwc7cm3b/${product.image}`}
                  alt={product.name}
                  className="card-img-top rounded-top-4"
                  style={{
                    objectFit: "cover",
                    height: "250px",
                  }}
                />
                <div className="card-body d-flex flex-column px-3 py-4">
                  <h5 className="card-title fw-semibold mb-1">{product.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {product.description}
                  </p>
                  <p className="card-text fw-bold text-primary mb-1">
                    KES {product.price}
                  </p>
                  <p className="card-text mb-3">
                    <small className={product.stock > 0 ? "text-success" : "text-danger"}>
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </small>
                  </p>
                  <button
                    className="btn btn-outline-primary mt-auto fw-semibold py-3 w-100"
                    onClick={() => {
                      addToCart(product);
                      showToast(`${product.name} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </button>
                  {addedProductId === product.id && (
                    <div className="alert alert-success mt-2 p-2 text-center">
                      ✅ Added to cart!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
