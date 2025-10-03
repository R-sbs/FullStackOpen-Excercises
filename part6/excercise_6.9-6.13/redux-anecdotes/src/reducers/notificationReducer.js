import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return (state = action.payload);
    },
    hideNotification(state) {
      return (state = "");
    },
  },
});

export const { showNotification, hideNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
