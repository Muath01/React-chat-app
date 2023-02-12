import { configureStore } from "@reduxjs/toolkit";
import {message} from "./message"
import {loggedAndReceiver} from "./message"
import {users} from "./users"
export const store = configureStore({
    reducer:{
        message: message.reducer,
        loggedAndReceiver: loggedAndReceiver.reducer,
        users:users.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;