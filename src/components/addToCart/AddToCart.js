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
        <div className='container cd-flex'>
            <div>
                <h2 className="text-center">Your Cart Details</h2>
            </div>
            {loading ? <Spinner /> :

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Imeges</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map(cart => (
                                <tr>
                                    <th scope="row">{++serialNo}</th>
                                    {/* <img src={require(`../`)}/> */}
                                    <td><img src={require(`../../../Backend/uploads/${cart.image}`)} style={{ width: "50px" }}></img></td>
                                    <td className='align-middle'>{cart.name}</td>
                                    <td className='align-middle'>{cart.price}</td>
                                    <td className='align-middle'><h3 >
                                        <i class="fa-solid fa-plus btn btn-success " onClick={() => handleShoeQuantity("+", cart.qty, cart._id)}></i>
                                        {/* <button onClick={() => handleShoeQuantity("+", cart.qty, cart._id)} >+</button> */}
                                        <strong className='align-middle'>{cart.qty}</strong>
                                        {/* <button onClick={() => handleShoeQuantity("-", cart.qty, cart._id)} >-</button> */}
                                        <i class="fa-solid fa-minus btn btn-danger" onClick={() => handleShoeQuantity("-", cart.qty, cart._id)} ></i>
                                    </h3>
                                    </td>
                                    <td className='align-middle'>
                                        <h3>{cart.price * cart.qty}</h3>
                                    </td>
                                    <td className='align-middle'>
                                        <i class="fa-solid fa-trash-can btn" onClick={() => deleteCart(cart._id, cart.id)}></i>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
            {loading ? null : <b>
                <label>Total Amount:</label>
                <span>{" " + +balance}</span>
            </b>}{loading ? null :
                <button style={{ marginLeft: "20px" }} className='btn btn-dark' onClick={toastify}><Link to="/contact">Order Now</Link></button>
            }
        </div>
    )
}
export default AddToCart
