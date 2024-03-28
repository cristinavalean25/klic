import { ActionTypes, Action, AppState } from "./types";

const initialState: AppState = {
  properties: [],
  currentPage: 1,
  lastPage: 1,
  loading: true,
  error: null,
};

const reducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.FETCH_PROPERTIES:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PROPERTIES_SUCCESS:
      return {
        ...state,
        properties: action.payload,
        loading: false,
        error: null,
        lastPage: action.payload.length > 0 ? state.lastPage : 1,
      };
    case ActionTypes.FETCH_PROPERTIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case ActionTypes.SET_LAST_PAGE:
      return { ...state, lastPage: action.payload };
    default:
      return state;
  }
};

export default reducer;
