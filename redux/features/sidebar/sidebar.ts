import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SideBarType = {
  isClosed: true,
};

const sideBarReducer = createSlice({
  name: "sidebar-reducer",
  initialState,
  reducers: {
    setIsClosed: (state: SideBarType, action: PayloadAction<boolean> ) => {
        state.isClosed = action.payload
    },
    toggle: (state: SideBarType ) => {
        state.isClosed = !state.isClosed
    },
  },
});

export default sideBarReducer.reducer;
export const { setIsClosed, toggle } = sideBarReducer.actions;
