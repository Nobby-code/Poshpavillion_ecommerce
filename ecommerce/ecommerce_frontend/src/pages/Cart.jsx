import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "./CartContext";
import { useToast } from "../components/ToastContext";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const { showToast } = useToast();

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
    <div className="container my-4">
      <h3 className="fw-bold mb-4 text-center">🛒 My Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
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
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-nowrap">{item.name}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>KES {item.price}</td>
                  <td>
                    KES {(item.quantity * parseFloat(item.price)).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end fw-bold">
                  Total:
                </td>
                <td colSpan="2" className="fw-bold text-success">
                  KES {getTotal().toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <Link to="/checkout" className="btn btn-success btn-lg">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;