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
                    headers: { "content-Type": "application/json" },
                }
            );
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
        <div className='container container-flex'>
            <div class="card" style={{ width: "20rem;" }} >
                <div class="card-body card-b">
                    <div className='d-flex'>
                        <h5 className="card-title align-center">{shoe.name}</h5>
                        {!like ?
                            <i class="fa-regular fa-heart btn" onClick={() => favoriteShoe(shoe.id)}></i>
                            : <i class="fa-solid fa-heart btn" onClick={() => favoriteShoe(shoe.id)}></i>
                        }
                    </div>
                    <img src={require(`../../../Backend/uploads/${shoe.image}`)} className="card-img-top shoe-image" alt="..." />
                    <b>

                        <label>Price:</label>
                        <span class="card-text">{shoe.price}</span>
                    </b>
                    <div className='d-flex'>

                        <button className='btn btn-secondary' onClick={() => deleteShoe(shoe._id)}>Delete</button>
                        <button className='btn btn-secondary' style={{ marginLeft: "5px" }} onClick={() => AddToCardPost(shoe.id, shoe.name, shoe.price, shoe.image, shoe.qty)}>Add To Cart</button>
                        <Link to="/cart-details">
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
