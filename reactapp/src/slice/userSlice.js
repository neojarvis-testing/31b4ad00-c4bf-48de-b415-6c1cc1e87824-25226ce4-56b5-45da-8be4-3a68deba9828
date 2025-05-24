import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        email: localStorage.getItem('email') || null,
        userInfo: {},
        token: localStorage.getItem('jwt_token') || null
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.email = localStorage.setItem('email', action.payload.email)
            state.token = localStorage.setItem('jwt_token', action.payload.jwt_token)
        },
        userDetails: (state, action) => {
            state.userInfo = action.payload
        },
        logoutUser: (state) => {
            state.email = localStorage.setItem("email", "")
            state.token = localStorage.setItem("jwt_token", "")
        }
    }
})

export const { setUserInfo, userDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;