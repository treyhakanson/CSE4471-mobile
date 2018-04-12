import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";

import { api } from "../constants";

// initial state
const INITIAL_STATE = {
   token: null,
   error: null
};

// actions
const ACTION = {
   LOGIN: Symbol("AUTH_ACTION/LOGIN"),
   SIGNUP: Symbol("AUTH_ACTION/SIGNUP"),
   LOGOUT: Symbol("AUTH_ACTION/LOGOUT")
};

// reducer
function reducer(state = INITIAL_STATE, action = {}) {
   switch (action.type) {
      case ACTION.LOGIN:
         return {
            ...state,
            ...action.payload
         };
      case ACTION.SIGNUP:
         return {
            ...state,
            ...action.payload
         };
      case ACTION.LOGOUT:
         return { ...state, token: null, error: null };
      default:
         return { ...state };
   }
}

export default persistReducer(
   {
      key: "auth",
      storage
   },
   reducer
);

// action creators
export function login(username, password) {
   return function(dispatch) {
      axios
         .post(api.buildURL("login"), {
            email: username,
            password
         })
         .then(res => {
            if (res.data.outcome === "successful") {
               console.log("LOGIN SUCCESSFUL.");
               dispatch(handleLogin(res.data.token));
            } else {
               let msg = "Please check your username and password.";
               console.log("LOGIN ERROR OCCURRED:", msg, res);
               dispatch(handleLogin(null, msg));
            }
         })
         .catch(err => {
            let msg = "Something went wrong, please try again later.";
            console.log("LOGIN ERROR OCCURRED:", msg, err);
            dispatch(handleLogin(null, msg));
         });
   };
}

export function signup(username, password, pushToken) {
   return function(dispatch) {
      axios
         .post(api.buildURL("signup"), {
            email: username,
            password,
            token: pushToken
         })
         .then(res => {
            if (res.data.outcome === "successful") {
               console.log("SIGN UP SUCCESSFUL.");
               dispatch(handleLogin(res.data.token));
            } else {
               let msg = "Something went wrong, please try again later.";
               console.log("SIGN UP ERROR OCCURRED:", msg, res);
               dispatch(handleLogin(null, msg));
            }
         })
         .catch(err => {
            let msg = "Something went wrong, please try again later.";
            console.log("LOGIN ERROR OCCURRED:", msg, err);
            dispatch(handleLogin(null, msg));
         });
   };
}

export function logout() {
   return {
      type: ACTION.LOGOUT,
      payload: null
   };
}

// action helpers
function handleLogin(token = null, error = null) {
   return {
      type: ACTION.LOGIN,
      payload: { token, error }
   };
}
