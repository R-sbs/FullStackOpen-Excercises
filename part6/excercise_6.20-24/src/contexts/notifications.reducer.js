const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return [...state, action.payload];
    case "HIDE":
      return (state = "");
    default:
      return state;
  }
};

export default notificationReducer;
