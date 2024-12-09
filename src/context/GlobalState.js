import React, {createContext, useReducer} from "react";
// Import AppReducer
import AppReducer from "./AppReducer";
// const data=localStorage.getItem("cartItem")!==null?JSON.parse(localStorage.getItem("cartItem")):[]

//Create initial state
const initialState={
    shoes:[],
    carts:[],
    search:[]
}
  
  // create the Global Context
  export const GlobalContext=createContext(initialState);
  
  // create a provider for the global context
  export const GlobalProvider=({children})=>{
      const [state, dispatch]=useReducer(AppReducer, initialState)
      
      // Delete Existing Shoe Action
      function deleteShoe(id) {
        
          dispatch({
              type: 'DELETE_SHOE',
              payload: id
            });
        }
        
        // Add New Shoe Action
        function addShoes(shoe) {
            dispatch({
                type: 'ADD_SHOES',
                payload: shoe
            })

    }

    // update shoe quantity
    function updateShoeQuantity(carts) {
        dispatch({
            type: 'UPDATE_SHOE_QUANTITY',
            payload: carts
        })
}


    // Add Shoe to Card Action
    function addToCard(id, name, price, image, qty, _id) {
        dispatch({
            type: 'ADD_TO_CARD',
            payload: {id, name, price, image, qty, _id}
        })
    }

    function deleteCartShoe(id) {
        
        dispatch({
            type: 'DELETE_CART_SHOE',
            payload: id
          });
      }

      // Add search Shoe Action
      function addSearchShoes(shoe) {
        dispatch({
            type: 'ADD_SEARCH_SHOES',
            payload: shoe
        })

}

    return(
        <GlobalContext.Provider value={
            {
                shoes:state.shoes,
                carts:state.carts,
                search:state.search,
                addShoes,
                deleteShoe,
                addToCard,
                updateShoeQuantity,
                deleteCartShoe,
                addSearchShoes
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}