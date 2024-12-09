export default (state, action) => {
    switch (action.type) {
        case 'DELETE_SHOE':

            return {
                ...state,
                shoes: state.shoes
                    .filter(shoe => shoe.id !== action.payload),
                carts: state.carts.filter(shoe => shoe.id !== action.payload),
            }

        case 'DELETE_CART_SHOE':
            return {
                ...state,
                carts: state.carts
                    .filter(cart => cart.id !== action.payload),
                // carts: state.carts.filter(shoe => shoe.id !== action.payload),
            }
        case 'ADD_SHOES':
            localStorage.setItem("cartItem", JSON.stringify(state.shoes))
            return {
                ...state,
                shoes: [action.payload, ...state.shoes],
            }
        case 'ADD_TO_CARD':
            const shoeToAdd = state.carts.find(shoe => shoe.id === action.payload.id);
            if (shoeToAdd) {
                state.carts.forEach((cart) => {
                    if (cart.id === action.payload.id) {
                        cart.qty = cart.qty + 1
                    }
                })
                return {
                    ...state,
                }
            }
            else {

                return {
                    ...state,
                    carts: [...state.carts,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        price: action.payload.price,
                        qty: action.payload.qty + 1,
                        image: action.payload.image
                    }
                    ],
                }
            }
        case 'UPDATE_SHOE_QUANTITY':
            return { ...state }
        case 'ADD_SEARCH_SHOES':
            return {
                ...state,
                search: action.payload,
            }
        default:
            return state;
    }
}