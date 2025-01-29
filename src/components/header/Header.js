import React, { useContext, useState } from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import SearchComponent from '../search/Search'

function Header() {

  const { carts } = useContext(GlobalContext)
  const [token,setToken] = useState('')
  
  

  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    alert("Logout Successfuly")
    navigate("/login")
  }

  return (
    <div>
      <nav className="bg-light shadow-md">
        <div className="container mx-auto px-4 py-2">
          <Link to="/" className="text-2xl font-bold text-blue-600">SHOESTORE</Link>
          <button
            className="navbar-toggler text-gray-500 border-0 hover:bg-gray-200 focus:outline-none md:hidden"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            {localStorage.getItem('token') ? (<>
              <li className="nav-item">
                <Link to="/" className="nav-link text-gray-700 hover:text-blue-600">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/create-shoes" className="nav-link text-gray-700 hover:text-blue-600">Add Shoes</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-gray-700 hover:text-blue-600">Contact</Link>
              </li>
              <li className="nav-item">
                <div className="flex items-center">
                  <SearchComponent />
                </div>
              </li>
              <li className="nav-item">
                <Link to="/add-to-cart-details" className="relative">
                  <img className="addToCard h-8 w-8" src="addToCart" alt="Cart Icon" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {+carts.length ? carts.length : null}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link text-gray-700 hover:text-blue-600">Logout</button>
              </li>
            </>):(<>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-gray-700 hover:text-blue-600">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link text-gray-700 hover:text-blue-600">Register</Link>
              </li>
            </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>


  )
}

export default Header
