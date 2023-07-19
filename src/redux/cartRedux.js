 import {createSlice} from "@reduxjs/toolkit"

 const cartSlice = createSlice ({
    name: "cart",
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
        },

        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload),1);
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        deleteAll : (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    }
 })

 
 export const {
    addProduct, 
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    deleteAll,
} = cartSlice.actions
 export default cartSlice.reducer
