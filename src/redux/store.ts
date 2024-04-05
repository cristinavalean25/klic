import { createStore } from "redux";
import propertyReducer from "./propertyReducer";

const store = createStore(propertyReducer);

export default store;
