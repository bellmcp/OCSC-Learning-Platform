import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import User from "./User";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <User />
      </Route>
    </Switch>
  );
}
