import { useEffect, useState, useContext } from "react";
import { useCart } from "./CartContext";
import { useToast } from "../components/ToastContext";
import { ProductContext } from "../context/ProductContext";

const Home = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched successfully:", data);
        setProducts(data.results);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [setProducts]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-dark">Latest Products</h2>

      {loading ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            height: "50vh",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Loading products...</p>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img
                  src={`https://res.cloudinary.com/dxwc7cm3b/${product.image}`}
                  alt={product.name || "Product Image"}
                  className="card-img-top"
                  style={{
                    objectFit: "cover",
                    height: "250px",
                  }}
                />
                <div className="card-body px-3 py-4 text-start">
                  <h5 className="card-title fw-semibold mb-1">{product.name}</h5>
                  <p className="card-text text-muted small mb-2">{product.description}</p>
                  <p className="card-text fw-bold text-primary mb-1">
                    KES {product.price}
                  </p>
                  <p className="card-text mb-3">
                    <small
                      className={product.stock > 0 ? "text-success" : "text-danger"}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </small>
                  </p>
                  <button
                    className="btn btn-outline-primary fw-semibold py-2 w-100"
                    onClick={() => {
                      addToCart(product);
                      showToast(`${product.name} added to cart!`);
                    }}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;