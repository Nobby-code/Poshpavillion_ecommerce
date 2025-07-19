// export default function Cart() {
//   return <h2>Cart Page</h2>;
// }

import React from 'react';
import { useCart } from './CartContext';
import { useToast } from '../components/ToastContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const { showToast } = useToast(); // ✅ Get showToast function

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );

  const handleRemove = (item) => {
    removeFromCart(item.id);
    showToast(` ${item.name} removed from cart`);
  };
    
  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">🛒 My Cart</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>KES {item.price}</td>
                  <td>KES {(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end fw-bold">Total:</td>
                <td colSpan="2" className="fw-bold text-success">KES {getTotal().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;