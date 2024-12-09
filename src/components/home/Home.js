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
    }, [])
    useEffect(() => {
        getAddToCart.map((cart) => {
            addToCard(cart.id, cart.name, cart.price, cart.image, cart.qty)
        })
    }, [getAddToCart])

    // const handlePrev = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage((prev) => prev - 1);
    //     }
    // };

    // const handleNext = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage((prev) => prev + 1);
    //     }
    // };
    const closeSearch = () => {
        addSearchShoes([]);
    }
    return (
        <div className='position-relativev '>
            <div>
                <h1 className='text-center'>
                    Welcome to Balghari ShoeStore
                </h1>
                <img className='home-shoe' src='https://theabsstore.com/cdn/shop/files/ABS-Web-Banner_c3269ade-3d4e-4058-8c5a-9d4321844b5f.jpg?v=1727360246&width=1500' alt='Home Image'></img>
                {/* position-absolute top-50 start-50 translate-middle */}
                {search.length ?
                    <div style={{ backgroundColor: "gray", border: "5px solid blue" }}>
                        <div className='float-end'>
                            <i class="fa-solid fa-x btn" onClick={() => closeSearch()}></i>
                        </div>
                        <h2 className='text-center'>Search Shoes!</h2>
                        <ul className='list d-flx shoe-image h-100 ' >
                            {
                                search.map(shoe => (
                                    <Card key={shoe.id} shoe={shoe} />
                                ))
                            }
                        </ul>
                    </div>
                    : null}
                {loading ? <Spinner className="my-3" /> : <>
                    <ul className='list d-flx shoe-image'>
                        {
                            getAllIShoes.map(shoe => (
                                <Card key={shoe.id} shoe={shoe} />
                            ))
                        }
                    </ul>
                </>
                }
            </div>
            {/* <div className='containet h-100'>
                <div className="box-container">
                    {getAllIShoes.map((box, index) => (
                        <div key={index} className="box">
                            {box.name}
                        </div>
                    ))}
                </div>
                <div className="pagination-controls">
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        P
                    </button>
                    <span>
                         {currentPage}  {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default Home
