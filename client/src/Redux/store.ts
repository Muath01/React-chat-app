import { configureStore } from "@reduxjs/toolkit";
import {message} from "./message"

export const store = configureStore({
    reducer:{
        message: message.reducer,
    }
})