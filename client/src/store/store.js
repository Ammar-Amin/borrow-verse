import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import readListReducer from "./slice/readListSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        readList: readListReducer,
        cart: cartReducer
    }
})

export default store;