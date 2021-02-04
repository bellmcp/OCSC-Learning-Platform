import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CurriculumList from "./CurriculumList";
import CurriculumDetails from "./CurriculumDetails";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <CurriculumDetails></CurriculumDetails>
      </Route>
      <Route path={path}>
        <CurriculumList></CurriculumList>
      </Route>
    </Switch>
  );
}
