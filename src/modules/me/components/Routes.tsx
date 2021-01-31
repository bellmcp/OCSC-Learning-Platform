import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Me from "./Me";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Me />
      </Route>
    </Switch>
  );
}
