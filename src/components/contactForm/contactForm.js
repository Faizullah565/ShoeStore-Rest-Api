import React, { useState, useEffect, useContext } from "react";
import axios from "axios";


function ContactForm() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      const getResult = await axios.get("http://localhost:5000/api/cart/get-addToCartDatas");
      setCarts(getResult.data.data); // Update state with fetched images
    }
    getCart()
  }, [])
  ////////////////////////////////
  const netAmount = (carts.map(cart => cart.price * cart.qty))
  const balance = +(netAmount.reduce((accumulator, currentValue) => +accumulator + +currentValue, 0))

  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div
      className="container mt-1 d-flex justify-content-center"
      style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", padding: "30px" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-50 p-4"
        style={{ backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
          <strong>Contact Form</strong>
        </h2>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country:
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Street Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">
            Postal Code:
          </label>
          <input
            type="number"
            className="form-control"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="e.g., +123-456-7890"
            pattern="^\+?[1-9]\d{1,14}$"
            title="Enter a valid phone number (e.g., +1234567890)"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 text-center">
          <h5>Total Amount: <span style={{ color: "#28a745" }}>Rs. {balance}</span></h5>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ backgroundColor: "#007bff", border: "none" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
