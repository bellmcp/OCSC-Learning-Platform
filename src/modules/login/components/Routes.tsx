import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./Login";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Login />
      </Route>
    </Switch>
  );
}
