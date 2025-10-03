import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definitions, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload);
    },
    upVote(state, action) {
      console.log(action);
      const idToVote = action.payload;
      return state.map((anecdote) => {
        if (anecdote.id !== idToVote) {
          return anecdote;
        }
        return {
          ...anecdote,
          votes: anecdote.votes + 1,
        };
      });
    },
  },
});

export const { createAnecdote, upVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// //action creator functions
// export const createAnecdote = (content) => {
//   return {
//     type: "CREATE_ANECDOTE",
//     payload: asObject(content),
//   };
// };

// export const upVote = (id) => {
//   return {
//     type: "UP_VOTE",
//     payload: { id },
//   };
// };

// //anecdote reducer
// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "CREATE_ANECDOTE":
//       return state.concat(action.payload);
//     case "UP_VOTE":
//       const idToVote = action.payload.id;
//       return state.map((anecdote) => {
//         if (anecdote.id !== idToVote) {
//           return anecdote;
//         }
//         return {
//           ...anecdote,
//           votes: anecdote.votes + 1,
//         };
//       });
//     default:
//       return state;
//   }
// };
