import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Support from "./Support";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Support />
      </Route>
    </Switch>
  );
}
