import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./features/sidebar/sidebar";
import messageReducer from "./features/message/message"
import chatReducer from "./features/chat/chat"
import themeReducer from "./features/theme/theme"

const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
    message: messageReducer,
    chat: chatReducer,
    theme: themeReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // for typing useSelector()
export type AppDispatch = typeof store.dispatch; // for typing useDispatch()
