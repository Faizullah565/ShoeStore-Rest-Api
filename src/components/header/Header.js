import React, { useContext } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import SearchComponent from '../search/Search'

function Header() {

  const { carts } = useContext(GlobalContext)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" >SHOESTORE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="create-shoes" className="nav-link" >Add-Shoes</Link>
              </li>
              <li className="nav-item">
                <Link to="contact" className="nav-link" >contact</Link>
              </li>
              <div className='float-end'>
                <li className="nav-item">
                  <SearchComponent />
                </li>
              </div>
              <li>
                <Link to="/add-to-cart-details">
                  <img className='addToCard' src="addToCart" />
                </Link>
              </li>
              <span className='cartSize mt-2'>{+carts.length ? +carts.length : null}</span>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
