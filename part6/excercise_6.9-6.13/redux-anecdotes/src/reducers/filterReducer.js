import { createSlice } from "@reduxjs/toolkit";

const initialStateOfFilter = "";

const filterReducer = createSlice({
  name: "filters",
  initialState: initialStateOfFilter,
  reducers: {
    setFilterText(state, action) {
      return (state = action.payload);
    },
    clearFilter(state, action) {
      return (state = initialStateOfFilter);
    },
  },
});

export const { setFilterText, clearFilter } = filterReducer.actions;
export default filterReducer.reducer;

// export const setFilterText = (text) => {
//   return {
//     type: "FILTER",
//     payload: { text },
//   };
// };

// export const clearFilter = () => {
//   return {
//     type: "CLEAR_FILTER",
//   };
// };

// const filterReducer = (state = initialStateOfFilter, action) => {
//   switch (action.type) {
//     case "FILTER":
//       return (state = action.payload.text);
//     case "CLEAR_FILTER":
//       return (state = initialStateOfFilter);
//     default:
//       return state;
//   }
// };
