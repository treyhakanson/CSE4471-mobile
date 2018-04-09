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
   LOGOUT: Symbol("AUTH_ACTION/LOGOUT")
};

// reducer
export default function(state = INITIAL_STATE, action = {}) {
   switch (action.type) {
      case ACTION.LOGIN:
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

// action creators
export function login(username, password) {
   return function(dispatch) {
      axios
         .get(api.buildURL("login"), {
            params: {
               username,
               password
            }
         })
         .then(res => dispatch(handleLogin(res.data.token)))
         .catch(err => dispatch(handleLogin(null, err)));
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
