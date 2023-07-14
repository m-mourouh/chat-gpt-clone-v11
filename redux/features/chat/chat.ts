import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ChatType = {
  chatId: "",
  hasMessages: false,
  isLoading: false,
  lastQuestion: ""
};

const chatReducer = createSlice({
  name: "chat-reducer",
  initialState,
  reducers: {
    setChatId: (state: ChatType, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    setLastQuestion: (state: ChatType, action: PayloadAction<string>) => {
      state.lastQuestion = action.payload;
    },
    setMessages: (state: ChatType,action: PayloadAction<boolean>) => {
      state.hasMessages = action.payload;
    },
    setIsLoading: (state: ChatType,action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default chatReducer.reducer;
export const { setMessages, setChatId, setIsLoading, setLastQuestion } =
  chatReducer.actions;
