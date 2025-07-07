// API call


const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/products/`);
  const data = await response.json();
  return data;
};