import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clearScreenDown } from "readline";

type InitialState = {
    chat_id?: number, 
    sender_id?: number, 
    reciever_id?: number, 
    chat?: string, 
    timestamp?: string, 
    status: "sent"
};

const initialState: InitialState = {
    status: "sent"
};

export const message = createSlice({
  name: "message",
  initialState,
  reducers: {

    setMessage: (state: InitialState, action: PayloadAction<string>) => {
      let item = action.payload;
      return {
        ...state,
        chat: action.payload
      }

      console.log("item from reducer: ", item)
      state.chat = item;
    },

}});

export const {
  setMessage,
} = message.actions;
