import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import login from "modules/login/reducer";

export default (history:any) =>
  combineReducers({
    router: connectRouter(history),
    login,
  });
