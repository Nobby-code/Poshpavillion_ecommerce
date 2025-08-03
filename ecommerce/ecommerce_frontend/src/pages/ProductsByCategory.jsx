// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const ProductsByCategory = () => {
//   const { categoryName } = useParams(); // e.g., "shoes"
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // fetch(`http://127.0.0.1:8000/api/products/?category=${categoryName}`)
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/products/?category=${categoryName}`)
//       .then(res => res.json())
//       .then(data => setProducts(data.results))
//       .catch(err => console.error("Error fetching products:", err));
//   }, [categoryName]);

//   return (
//     <div className="container mt-4">
//       <h2>Products in "{categoryName}"</h2>
//       <div className="row">
//         {products.length > 0 ? (
//           products.map(product => (
//             <div key={product.id} className="col-md-4 mb-3">
//               <div className="card h-100">
//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt={product.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">{product.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsByCategory;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductSkeletonCard from '../components/ProductSkeletonCard';

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/?category=${categoryName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.results);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-capitalize">Products in "{categoryName}"</h2>

      {loading ? (
        <div className="row">
          {[...Array(6)].map((_, i) => (
            <div className="col-md-4 mb-3" key={i}>
              <ProductSkeletonCard />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: 'cover', height: '250px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text flex-grow-1">{product.description}</p>
                  <button className="btn btn-outline-primary mt-auto">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductsByCategory;