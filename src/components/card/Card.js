import React, { useContext, useState, useEffect } from 'react'
import "./Card.css"
import { GlobalContext } from '../../context/GlobalState'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Card({ shoe }) {
  const { addToCard } = useContext(GlobalContext);
  const { deleteCartShoe } = useContext(GlobalContext);
  const [alreadyFound, setAlreadyFound] = useState([])
  const [like, setLike] = useState(false)

  useEffect(() => {
    const getCart = async () => {
      const getResult = await axios.get("http://localhost:5000/api/cart/get-addToCartDatas");
      setAlreadyFound(getResult.data.data); // Update state with fetched addToCart data
    }
    getCart()
  }, [alreadyFound])
  const AddToCardPost = async (id, name, price, image, qty) => {
    const getResult = await axios.get("http://localhost:5000/api/cart/get-addToCartDatas");
    setAlreadyFound(getResult.data.data); // Update state with fetched addToCart data
    const foundElement = alreadyFound.find((element) => element.id === id);
    if (foundElement) {
      let updatetedData = { id, name, price, image, qty: qty + 1 }
      try {
        const result = await axios.put(
          `http://localhost:5000/api/cart/edit-cart/${foundElement._id}`,
          updatetedData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          });
        return result.data; // Handle success response here
      } catch (error) {
        console.error("Error editing image:", error);
        throw error; // Handle error here
      }
    }
    else {
      let cartData = {
        name: shoe.name,
        price: shoe.price,
        image: shoe.image,
        qty: shoe.qty,
        id: id,
        _id: shoe._id
      }
      addToCard(id, name, price, image, qty)
      ///////////////////////////////////////////////////
      const result = await axios.post(
        "http://localhost:5000/api/cart/add-to-cart",
        cartData,
        {
          headers: {
            "content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // const json = await result.json()
      // console.log(json)
      toast.success("Successfully added Shoe")
    }
  }
  /////////////////////////////////////////////////
  const deleteShoe = async (id) => {
    deleteCartShoe(id)
    try {
      const result = await axios.delete(`http://localhost:5000/api/AddShoe/delete-shoe/${id}`);
      console.log(result.data)
      return result.data; // Handle success response here
    } catch (error) {
      console.error("Error deleting shoe:", error);
      throw error; // Handle error here
    }
  }
  const favoriteShoe = (id) => {
    if (like === false) {
      setLike(true)
      console.log(id)
    }
    else if (like === true) {
      setLike(false)
    }
    else {
      return
    }
  }

  return (
    <div className="container mx-auto flex flex-wrap gap-4 p-4">
      <div className="card bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: "20rem" }}>
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="card-title text-lg font-semibold">{shoe.name}</h5>
            {!like ? (
              <i
                className="fa-regular fa-heart text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => favoriteShoe(shoe.id)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-heart text-red-500 cursor-pointer hover:text-gray-500"
                onClick={() => favoriteShoe(shoe.id)}
              ></i>
            )}
          </div>
          <img
            src={require(`../../../Backend/uploads/${shoe.image}`)}
            className="card-img-top w-full h-48 object-cover"
            alt={shoe.name}
          />
          <b className="block mt-4 text-gray-700">
            <label className="block text-sm font-medium">Price:</label>
            <span className="card-text text-lg">{shoe.price}</span>
          </b>
          <div className="flex items-center gap-2 mt-4">
            {/* <button
          className="btn bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => deleteShoe(shoe._id)}
        >
          Delete
        </button> */}
            <button
              className="btn bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={() => AddToCardPost(shoe.id, shoe.name, shoe.price, shoe.image, shoe.qty)}
            >
              Add To Cart
            </button>
            <Link to="/add-to-cart-details" className="ml-auto text-blue-500 hover:text-blue-700">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Card
