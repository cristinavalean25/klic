import { AppState, Action, ActionTypes } from "./types";

const initialState: AppState = {
  properties: [],
  currentPage: 1,
  lastPage: 1,
  loading: true,
  waiting: false,
};

const reducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA:
      return { ...state, loading: true };
    case ActionTypes.SET_DATA:
      return {
        ...state,
        properties: action.payload.properties,
        lastPage: action.payload.lastPage,
        loading: false,
      };
    case ActionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case ActionTypes.SET_WAITING:
      return { ...state, waiting: action.payload };
    default:
      return state;
  }
};

export default reducer;
