import { createStore } from "redux";

const initialState = {
  image: "",
  slider: 0.1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "IMAGE":
      return { ...state, image: action.values };
    case "SLIDEVALUE":
      return { ...state, slider: action.values };
    default:
      return state;
  }
};

export const store = createStore(reducer);
