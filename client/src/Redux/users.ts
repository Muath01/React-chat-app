import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clearScreenDown } from "readline";
import * as io from "socket.io-client";


type initialState = Array<{
    first_name?: string;
    second_name?: string;
    user_name?: string;
    user_id?: number;
  }>;
  
const initialState: initialState = []



export const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        
        updateUser: (state:initialState, action: PayloadAction<Object>) => {

            const item = action.payload as any; // using any in here is fine, because the data I'm bringing here is checked in the RightBar componenet. 


            // console.log(state)
            return [...item]
            // console.log("item", item[0])
        }
    }
  });

  export const {updateUser} = users.actions