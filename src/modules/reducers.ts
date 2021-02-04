import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import login from "modules/login/reducer";
import user from "modules/user/reducer";
import categories from "modules/categories/reducer";
import courses from "modules/courses/reducer";
import curriculums from "modules/curriculums/reducer";
import press from "modules/press/reducer";
import support from "modules/support/reducer";
import ui from "modules/ui/reducer";

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    login,
    user,
    categories,
    courses,
    curriculums,
    press,
    support,
    ui,
  });
