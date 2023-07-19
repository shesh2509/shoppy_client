import { 
    loginFailure, 
    loginStart, 
    loginSuccess, 
    logout,
} from "./userSlice"
import {
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    deleteAll,
} from "./cartRedux"
import { publicRequest, userRequest } from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
        localStorage.setItem('currentUser', JSON.stringify(res.data))
        window.location.href='/'
    }catch(err){
        dispatch(loginFailure())
    }
}


export const registerUser = (user) => async dispatch => {

    dispatch({type: 'USER_REGISTER_REQUEST'})

    try{
        const response = await publicRequest.post('/auth/register', user)
        console.log(response)
        dispatch({type: 'USER_REGISTER_SUCCESS'})
    }catch(error){
        dispatch({type: 'USER_REGISTER_FAILED', payload: error})
    }
}

export const addOrders = (orders) => async dispatch => {
    const response = await userRequest.post('/orders', orders)
    dispatch(orders)
    console.log(response)
}

export const logoutUser = (dispatch) => {
    dispatch(logout());
    dispatch(deleteAll());
}

export const clearCart = (dispatch) => {
    dispatch(deleteAll());
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete(`/products/${id}`)
        console.log(res)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailure())
    }
}
