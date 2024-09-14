import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addBookToCart: (state, action) => {
            state.push(action.payload)
        },
        removeBookFromCart: (state, action) => {
            return state.filter((book) => book._id !== action.payload)
        }
    }
})

export const { addBookToCart, removeBookFromCart } = cartSlice.actions

export default cartSlice.reducer

