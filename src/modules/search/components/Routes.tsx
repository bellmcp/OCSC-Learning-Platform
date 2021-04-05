import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SearchResult from "./SearchResult";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`}>
        <SearchResult></SearchResult>
      </Route>
    </Switch>
  );
}
