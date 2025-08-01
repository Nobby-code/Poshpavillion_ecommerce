import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
// import { useToast } from '../components/ToastContext';
import { useToast } from "../components/ToastContext"; // ✅ Import useToast hook
// import { useCart } from "./CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState(null); // track recently added product
  const { showToast } = useToast(); // ✅ Get showToast function

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched successsully:", data);
        setProducts(data.results);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false)); // Set loading to false after fetching
  }, []);

  return (
    <div className="container px-0 my-5">
      <h2 className="text-start ps-2 mb-4 fw-bold text-dark">
        Latest Products
      </h2>
      {loading ? (
        <div
          className="text-center w-200 py-10"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-2">Loading, please wait...</h5>
        </div>
      ) : (
        // <div className="row">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                {/* {product.image && (
                <img
                  //   src={product.image}
                  src={`http://127.0.0.1:8000${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
              )} */}
                <img
                  // src={product.image}
                  src={`https://res.cloudinary.com/dxwc7cm3b/${product.image}`}
                  alt={product.name}
                  className="card-img-top rounded-top-4"
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                <div className="card-body text-start px-3 py-4">
                  <h5 className="card-title fw-semibold mb-1">
                    {product.name}
                  </h5>
                  <h3 className="card-text text-muted small mb-2">
                    {product.description}
                  </h3>
                  {/* <h3 className="card-text">{product.stock}</h3> */}
                  <p className="card-text fw-bold text-primary mb-1 card-price">
                    KES {product.price}
                  </p>
                  <p className="card-text mb-3">
                    <small
                      className={
                        product.stock > 0 ? "text-success" : "text-danger"
                      }
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </small>
                  </p>
                  <button
                    className="btn btn-outline-primary fw-semibold py-3 w-100 card-btn-custom"
                    onClick={() => {
                      addToCart(product);
                      showToast(`${product.name} added to cart!`); // Show success toast message
                      // setTimeout(() => setAddedProductId(null), 2000); // Hide after 2s
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
      )}
    </div>
  );
};

export default Home;
