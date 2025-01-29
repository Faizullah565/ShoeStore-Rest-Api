import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import Card from '../card/Card'
import { GlobalContext } from '../../context/GlobalState'
import axios from 'axios'
import Spinner from '../Spinner/Spinner';
function Home() {
    const { search } = useContext(GlobalContext)
    const { carts } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true)
    const [getAllIShoes, setAllShoes] = useState([])
    const [getAddToCart, setAddToCart] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    const { addToCard } = useContext(GlobalContext);
    const { addSearchShoes } = useContext(GlobalContext)
    const itemsPerPage = 12;
    useEffect(() => {
        const getShoes = async (page) => {
            try {
                const result = await axios.get("http://localhost:5000/api/AddShoe/get-image",
                    {
                        params: { page, itemsPerPage },
                    });
                setAllShoes(result.data.data); // Update state with fetched images
                setTotalPages(result.data.totalPages);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        getShoes(); // Call the function inside useEffect
    }, [carts]);
    useEffect(() => {
        const getCart = async () => {
            const getResult = await axios.get("http://localhost:5000/api/cart/get-addToCartDatas");
            setAddToCart(getResult.data.data); // Update state with fetched addToCart data
        }
        getCart()
    }, [getAddToCart])
    useEffect(() => {
        getAddToCart.map((cart) => {
            addToCard(cart.id, cart.name, cart.price, cart.image, cart.qty)
        })
    }, [getAddToCart])

    const closeSearch = () => {
        addSearchShoes([]);
    }
    return (
        <div className="relative">
            <div>
                <h1 className="text-center text-4xl font-bold my-6">
                    Welcome to Balghari ShoeStore
                </h1>
                <img
                    className="w-full h-auto rounded-lg shadow-md"
                    src="https://theabsstore.com/cdn/shop/files/ABS-Web-Banner_c3269ade-3d4e-4058-8c5a-9d4321844b5f.jpg?v=1727360246&width=1500"
                    alt="Home"
                />

                {search.length > 0 ? (
                    <div className="bg-gray-200 border-4 border-blue-500 mt-6 p-4 rounded-lg shadow-md">
                        <div className="flex justify-end">
                            <i
                                className="fa-solid fa-x text-gray-500 cursor-pointer hover:text-gray-700"
                                onClick={() => closeSearch()}
                            ></i>
                        </div>
                        <h2 className="text-center text-2xl font-semibold my-4">Search Shoes!</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {search.map((shoe) => (
                                <Card key={shoe.id} shoe={shoe} />
                            ))}
                        </ul>
                    </div>
                ) : null}

                {loading ? (
                    <div className="my-6 mx-auto flex justify-center">
                        <Spinner className="my-6 mx-auto" />
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {getAllIShoes.map((shoe) => (
                            <Card key={shoe.id} shoe={shoe} />
                        ))}
                    </ul>
                )}
            </div>
        </div>

    )
}

export default Home
