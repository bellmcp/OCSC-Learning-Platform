import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "./Home";
import { CURRICULUM } from "shared/curriculum";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Home curriculum={CURRICULUM} />
      </Route>
    </Switch>
  );
}
