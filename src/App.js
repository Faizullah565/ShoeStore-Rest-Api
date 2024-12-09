import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreateShoe from './components/admin/createShoe/CreateShoe';
import { GlobalProvider } from './context/GlobalState';
import AddToCart from './components/addToCart/AddToCart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './components/contactForm/contactForm';

function App() {
  return (
    <div className="App">

      <GlobalProvider>
        <Router>
          <div>
            <Header className="App-header" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-shoes" element={<CreateShoe />} />
                <Route path='/add-to-cart-details' element={<AddToCart />} />
                <Route path='/contact' element={<ContactForm />} />
              </Routes>
            <ToastContainer/>
          </div>
        </Router>
      </GlobalProvider>
    </div >
  );
}

export default App;
