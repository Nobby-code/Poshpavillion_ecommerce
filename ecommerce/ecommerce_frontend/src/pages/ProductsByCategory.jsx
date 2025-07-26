import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductsByCategory = () => {
  const { categoryName } = useParams(); // e.g., "shoes"
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/?category=${categoryName}`)
      .then(res => res.json())
      .then(data => setProducts(data.results))
      .catch(err => console.error("Error fetching products:", err));
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <h2>Products in "{categoryName}"</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;