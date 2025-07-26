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

  const handleSubmitOld = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Send form + cartItems to backend or localStorage (for now)
    console.log("Order submitted:", { form, cartItems });

    // Clear cart or show success message here
    // clearCart(); // Clear cart after successful order
    // navigate('/order-success'); // or wherever
    // alert('Order placed successfully!'); // Temporary success message
    setTimeout(() => {
      clearCart(); // Clear cart after successful order
      alert("Order placed successfully!");
      navigate("/order-success");
    }, 1000);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:8000/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        // cartItems,
        cart_items: cartItems,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    const data = await response.json();
    console.log("Order response from server:", data);

    clearCart();
    alert("Order placed successfully!");
    navigate("/order-success");
  } catch (error) {
    console.error("Error submitting order:", error);
    alert("There was a problem placing your order.", error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>Shipping Information</h4>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="form-control mb-2"
              value={form.full_name}
              onChange={handleChange}
              required
            />
            <input
              type="country"
              name="country"
              placeholder="Country"
              className="form-control mb-2"
              value={form.country}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="form-control mb-2"
              pattern="[0-9]{10}"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control mb-2"
              value={form.email}
              onChange={handleChange} 
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control mb-2"
              value={form.city}
              onChange={handleChange} 
              required
            />

            <input
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              className="form-control mb-2"
              value={form.postal_code}
              onChange={handleChange} 
              required
            />

            <textarea
              name="address"
              placeholder="Shipping Address"
              className="form-control mb-3"
              value={form.address}
              onChange={handleChange}
              required
            />

            {/* <button type="submit" className="btn btn-primary">
              Place Order
            </button> */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex justify-content-between mb-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>KES {item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <h5>Total: KES {total}</h5>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
