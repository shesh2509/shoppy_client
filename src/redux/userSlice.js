import { createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState : {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
        }
    }
})

export const registerUserReducer = (state={}, action) => {

    switch(action.type){
        case 'USER_REGISTER_REQUEST' : return{
            loading: true
        }
        case 'USER_REGISTER_SUCCESS' : return{
            loading: false,
            success: true
        }
        case 'USER_REGISTER_FAILED' : return{
            loading: false,
            error: action.payload
        }
        default : return state 
    }
}

export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions
export default userSlice.reducer