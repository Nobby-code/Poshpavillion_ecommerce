import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    country: "",
    address: "",
    phone_number: "",
    email: "",
    city: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            cart_items: cartItems,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order response from server:", data);

      clearCart();
      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was a problem placing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row g-4">
        {/* Shipping Form */}
        <div className="col-12 col-lg-6">
          <form onSubmit={handleSubmit}>
            <h4 className="mb-3">Shipping Information</h4>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="form-control mb-3"
              value={form.full_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="form-control mb-3"
              value={form.country}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              className="form-control mb-3"
              pattern="[0-9]{10}"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control mb-3"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              className="form-control mb-3"
              value={form.postal_code}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              className="form-control mb-4"
              rows="3"
              value={form.address}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-6">
          <h4 className="mb-3">Order Summary</h4>
          <div className="border rounded p-3 shadow-sm bg-light">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span>
                  {item.name} × <strong>{item.quantity}</strong>
                </span>
                <span>KES {item.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span>KES {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;