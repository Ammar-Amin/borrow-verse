import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const readListSlice = createSlice({
    name: 'readList',
    initialState: initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload)
        },
        removeBook: (state, action) => {
            return state.filter((book) => book._id !== action.payload)
        }
    }
})

export const { addBook, removeBook } = readListSlice.actions

export default readListSlice.reducer