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
    <div className="container mt-1 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-center mb-5 text-blue-500 font-bold text-3xl">
          Contact Form
        </h2>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
            Country:
          </label>
          <input
            type="text"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
            Street Address:
          </label>
          <input
            type="text"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
            City:
          </label>
          <input
            type="text"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700">
            Postal Code:
          </label>
          <input
            type="number"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-input mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="mb-4 text-center">
          <h5 className="text-xl text-green-500">Total Amount: Rs. {balance}</h5>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>

  );
}

export default ContactForm;
