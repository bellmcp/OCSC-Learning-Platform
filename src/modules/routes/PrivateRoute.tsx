// @ts-nocheck
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "utils/isLogin";

const PATH = process.env.REACT_APP_BASE_PATH;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to={`${PATH}/login`} />
      }
    />
  );
};

export default PrivateRoute;
