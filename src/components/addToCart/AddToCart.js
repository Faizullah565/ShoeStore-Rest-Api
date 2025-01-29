import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { toast } from 'react-toastify'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'

function AddToCart() {
    const { addToCard } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true)
    const [get, setGet]=useState("")
    const { deleteCartShoe } = useContext(GlobalContext)
    const [updateCart, setUpdateCart]= useState()
    const [carts, setCarts] = useState([])

    useEffect(() => {
        const getCart = async () => {
            const getResult = await axios.get("http://localhost:5000/api/cart/get-addToCartDatas");
            setCarts(getResult.data.data); // Update state with fetched images
            setLoading(false)
        }
        getCart()
    }, [get])
    useEffect(()=>{
        carts.map((cart) => {
            addToCard(cart.id, cart.name, cart.price, cart.image, cart.qty, cart._id)
        })
    },[carts]);
    const netAmount = (carts.map(cart => cart.price * cart.qty))
    const balance = +(netAmount.reduce((accumulator, currentValue) => +accumulator + +currentValue, 0))

    const handleShoeQuantity = async(sign, qty, id) => {
        if (sign === "+") {
            try {
                const result = await axios.put(
                    `http://localhost:5000/api/cart/add-quantity-cart/${id}`,
                    "",
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    setGet(result.data)
                    console.log(result.data)
                return result.data; // Handle success response here
            } catch (error) {
                console.error("Error editing image:", error);
                throw error; // Handle error here
            }
        } else if (sign === "-" && qty>1) {
            try {
                const result = await axios.put(
                    `http://localhost:5000/api/cart/minus-quantity-cart/${id}`,
                    "",
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    setGet(result.data)
                    console.log(result.data)
                return result.data; // Handle success response here
            } catch (error) {
                console.error("Error editing image:", error);
                throw error; // Handle error here
            }
        }
        else{
            console.log("minimum quanity is:",qty)
            return
        }
    }
    const toastify = () => {
        toast.success("Order successfuly placed")
    }
    /////////////////////////////////////////////////
    const deleteCart = async (id, i) => {
        console.log(id, i);
        // deleteCartShoe(id)
        try {
            const result = await axios.delete(`http://localhost:5000/api/cart/delete-addToCart/${id}`);
            setGet(result.data)
            setUpdateCart(i)
            return result.data; // Handle success response here
        } catch (error) {
            console.error("Error deleting image:", error);
            throw error; // Handle error here
        }
    }
    useEffect(()=>{
        deleteCartShoe(updateCart)
    }, [updateCart])

    let serialNo = 0;
    return (
        <div className="container mx-auto flex flex-col gap-4 p-4">
  <div>
    <h2 className="text-center text-2xl font-bold">Your Cart Details</h2>
  </div>
  {loading ? (
    <div className="flex justify-center">
    <Spinner/>
    </div>
  ) : (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">#</th>
          <th className="border border-gray-300 px-4 py-2">Images</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Price</th>
          <th className="border border-gray-300 px-4 py-2">Quantity</th>
          <th className="border border-gray-300 px-4 py-2">Total</th>
          <th className="border border-gray-300 px-4 py-2">Remove</th>
        </tr>
      </thead>
      <tbody>
        {carts.map((cart, index) => (
          <tr key={cart._id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <img
                src={require(`../../../Backend/uploads/${cart.image}`)}
                className="w-12 h-12 object-cover mx-auto"
                alt="Product"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">{cart.name}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{cart.price}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleShoeQuantity("+", cart.qty, cart._id)}
                >
                  +
                </button>
                <span className="font-semibold">{cart.qty}</span>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleShoeQuantity("-", cart.qty, cart._id)}
                >
                  -
                </button>
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
              {cart.price * cart.qty}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteCart(cart._id, cart.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  {loading ? null : (
    <div className="flex justify-between items-center">
      <b>
        <label>Total Amount:</label>
        <span className="ml-2 font-bold text-lg">{balance}</span>
      </b>
      <button
        className="ml-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        onClick={toastify}
      >
        <Link to="/contact">Order Now</Link>
      </button>
    </div>
  )}
</div>
    )
}
export default AddToCart
