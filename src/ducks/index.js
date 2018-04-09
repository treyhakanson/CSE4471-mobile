import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import siteReducer from "./site-duck";
import authReducer from "./auth-duck";

const rootReducer = combineReducers({
   site: siteReducer,
   auth: authReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export * as site from "./site-duck";
export * as auth from "./auth-duck";
export default store;
