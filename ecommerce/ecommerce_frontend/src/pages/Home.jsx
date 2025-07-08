import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched successsully:", data);
        setProducts(data.results);
      });
  }, []);

  return (
    <div className="container px-0">
      <h2 className="text-start ps-2">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {/* {product.image && (
                <img
                  //   src={product.image}
                  src={`http://127.0.0.1:8000${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
              )} */}
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "300px" }}
              />
              <div className="card-body text-start">
                <h5 className="card-title">{product.name}</h5>
                <h3 className="card-text">{product.description}</h3>
                {/* <h3 className="card-text">{product.stock}</h3> */}
                <p className="card-text">KES {product.price}</p>
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
                <button className="btn btn-primary py-3 w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
