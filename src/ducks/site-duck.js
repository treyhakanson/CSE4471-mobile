// initial state
const INITIAL_STATE = {
   // TODO: remove temporary fake data; replace with []
   data: [
      { key: "a", title: "Sample App 1", actionDate: require("moment")() },
      { key: "b", title: "Sample App 2" },
      { key: "c", title: "Sample App 3" }
   ]
};

// actions
const ACTION = {
   UPDATE_ALL: Symbol("SITE_ACTION/UPDATE_ALL"),
   UPDATE_ONE: Symbol("SITE_ACTION/UPDATE_ONE")
};

// reducer
export default function(state = INITIAL_STATE, action = {}) {
   switch (action.type) {
      case ACTION.UPDATE_ALL:
         return { ...state, data: action.payload };
      case ACTION.UPDATE_ONE:
         let data = [...state.data];
         const idx = data.findIndex(x => x.key === action.payload.key);
         data[idx] = action.payload;
         return { ...state, data };
      default:
         return { ...state };
   }
}

// action creators
export function updateAll(data) {
   return {
      type: ACTION.UPDATE_ALL,
      payload: [...data]
   };
}

export function updateOne(datum) {
   return {
      type: ACTION.UPDATE_ONE,
      payload: { ...datum }
   };
}
