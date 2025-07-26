import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const { categorySlug } = useParams();  // get category from URL
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [search, selectedCategory, categorySlug]);

  const fetchCategories = async () => {
    const res = await axios.get('/api/categories/');
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    let url = '/api/products/?';
    if (search) url += `search=${search}&`;
    if (selectedCategory) url += `category=${selectedCategory}&`;

    const res = await axios.get(url);
    setProducts(res.data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <div className="product-list">
        {products.map(product => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>Category: {product.category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;