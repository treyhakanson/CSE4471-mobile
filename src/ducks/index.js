import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

import siteReducer from "./site-duck";
import authReducer from "./auth-duck";

const rootReducer = combineReducers({
   site: siteReducer,
   auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export * as site from "./site-duck";
export * as auth from "./auth-duck";
