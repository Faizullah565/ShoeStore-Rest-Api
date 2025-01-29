// import cloudanary from 
// import Cloudanary from '../cloudanary/Cloudanary';

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const port="http://localhost:5000"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    let navigate = useNavigate()

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     console.log(name, email, role, password)
    //     try {
    //         await axios.post(`${port}/api/auth/register`, { name, email,role, password });
    //         alert("Registration successful! Please login.");
    //       } catch (error) {
    //         console.error(error.response.data.message);
    //       }
    // }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData= new FormData();
        // formData.append("name", name)
        // formData.append("email", email)
        // formData.append("role", role)
        // formData.append("password", password)
        // formData.append("id", new Date().getTime())
        let id = new Date().getTime();
        
        const response = await fetch(`http://localhost:5000/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body:formData
            body: JSON.stringify({ name, email, role, password, id })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            // localStorage.setItem("token", json.authtoken)
            navigate("/login")
            // props.showAlert("Account Created Successfuly", "success")
        }
        else {
            alert("Invalid Details", "danger")
        }
    }
    
    return <>
        <div className='container mx-auto px-4 py-8'>
  <h3 className='text-2xl font-semibold mb-6 text-center'>Signup</h3>
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          id="name"
          placeholder="Enter user name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          id="email"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="text-xs text-gray-500">We'll never share your email with anyone else.</small>
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          onChange={(e) => setRole(e.target.value)}
          className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          id="role"
          placeholder="Enter role: admin, user, owner"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          id="password"
          placeholder="Password"
        />
      </div>

      <div className="mb-4">
        {/* Image upload component if needed */}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
      <p className="text-center text-sm font-light mt-2 text-gray-500 dark:text-gray-400">
                  Do you have an account yet?{" "}
                  <Link to="/login" className=" font-medium text-primary-600 hover:underline dark:text-primary-500">
                    LOGIN
                  </Link>
                </p>
    </form>
  </div>
</div>

    </>
}