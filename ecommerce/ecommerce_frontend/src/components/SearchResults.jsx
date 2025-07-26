import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  //   useEffect(() => {
  //     const fetchResults = async () => {
  //       try {
  //         const res = await axios.get(`/api/products/?search=${searchQuery}`);
  //         setProducts(res.data);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     if (searchQuery) fetchResults();
  //   }, [searchQuery]);

  useEffect(() => {
    console.log("searchQuery:", searchQuery);
    if (searchQuery) {
      axios
        .get(`/api/products/?search=${searchQuery}`)
        .then((res) => {
          console.log("Full response from backend:", res.data);
          setProducts(res.data.results);
          // setProducts(res.data);
          console.log(res.data.results);
        })
        .catch((err) => console.error(err));
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
      {Array.isArray(products) && products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              {/* <ProductCard product={product} /> */}
              <div className="card h-100">
                <img
                  src={product.image}
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
