import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import createRootReducer from "modules/reducers";

export const history = createBrowserHistory();
function configureStore(initialState) {
  const middleware = [
    reduxThunk,
    routerMiddleware(history),
    loadingBarMiddleware({
      promiseTypeSuffixes: ["REQUEST", "SUCCESS", "FAILURE"],
    }),
  ];

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return store;
}

export default configureStore;
