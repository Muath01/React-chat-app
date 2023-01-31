import { configureStore } from "@reduxjs/toolkit";
import {message} from "./message"
import {loggedAndReceiver} from "./message"
export const store = configureStore({
    reducer:{
        message: message.reducer,
        loggedAndReceiver: loggedAndReceiver.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;