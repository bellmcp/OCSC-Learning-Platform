import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "./Home";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <div style={{ overflowX: "hidden" }}>
          <Home />
        </div>
      </Route>
    </Switch>
  );
}
