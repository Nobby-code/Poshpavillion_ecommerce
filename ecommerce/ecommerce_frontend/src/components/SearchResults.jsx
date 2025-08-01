import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductSkeletonCard from "./ProductSkeletonCard";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //     const fetchResults = async () => {
  //       try {
  //         const res = await axios.get(`/api/products/?search=${searchQuery}`);
  //         setProducts(res.data);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }; ${import.meta.env.VITE_API_BASE_URL}/products/
  //     if (searchQuery) fetchResults();
  //   }, [searchQuery]);

  useEffect(() => {
    console.log("searchQuery:", searchQuery);
    if (searchQuery) {
      setLoading(true); // start loading
      axios
        // .get(`/api/products/?search=${searchQuery}`)
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/products/?search=${searchQuery}`
        )
        .then((res) => {
          console.log("Full response from backend:", res.data);
          setProducts(res.data.results);
          setLoading(false); // stop loading
          // setProducts(res.data);
          console.log(res.data.results);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false); // stop loading on error
        });
    }
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <h2>Search Results for: "{searchQuery}"</h2>
      {/* <div className="row">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Ksh {product.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div> */}
      {loading ? (
        // <div className="d-flex justify-content-center align-items-center my-5">
        //   <TailSpin height="80" width="80" color="#0d6efd" />
        // </div>
        // <div
        //   className="text-center w-200 py-10">
        //   <div className="spinner-border text-primary" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        //   <h5 className="mt-2">Loading, please wait...</h5>
        // </div>
        <div className="d-flex flex-wrap justify-content-start">
          {[...Array(6)].map((_, i) => (
            <ProductSkeletonCard key={i} />
          ))}
        </div>
      ) : Array.isArray(products) && products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              {/* <ProductCard product={product} /> */}
              <div className="card h-100">
                <img
                  //   src={product.image}
                  src={`https://res.cloudinary.com/dxwc7cm3b/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h3 className="card-text">{product.description}</h3>
                  <p className="card-text">Ksh {product.price}</p>
                  <p className="card-text">
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
