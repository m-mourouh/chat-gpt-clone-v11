import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Theme = {
  theme: "system",
};

const themeReducer = createSlice({
  name: "theme-reducer",
  initialState,
  reducers: {
    setTheme: (
      state: Theme,
      action: PayloadAction<"system" | "dark" | "light">
    ) => {
      state.theme = action.payload;
    },
  },
});

export default themeReducer.reducer;
export const { setTheme } = themeReducer.actions;
