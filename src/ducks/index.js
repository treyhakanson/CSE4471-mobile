import { createStore, combineReducers } from "redux";
import siteReducer from "./site-duck";

const rootReducer = combineReducers({
   site: siteReducer
});
const store = createStore(rootReducer);

export * as site from "./site-duck";
export default store;
