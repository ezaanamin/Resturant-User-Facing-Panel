import { createSlice } from "@reduxjs/toolkit";


const initialState={

    cartItems:[],
    totalQuanity:0,
    totalAmount:0

}

const CartSlice=createSlice({


    name:"cart",
    initialState,
    reducers:{

        addToCart(state,action)
        {
            state.cartItems.push(action.payload)
        },
        GetTotal(state,action)
        {
         state.totalAmount=state.cartItems?.reduce((amount, item) => item.price + amount, 0);

       
        },
        RemoveCart(state,action)
        {
          const itemId=action.payload
         state.cartItems=state.cartItems.filter((item)=>item.id!==itemId)
        },
        RemoveAllCart(state,action)
        {
            state.cartItems = []; 


        }
    
    }
})

export const {addToCart,GetTotal,RemoveCart}=CartSlice.actions

export default CartSlice.reducer