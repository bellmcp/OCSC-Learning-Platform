import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CourseList from "./CourseList";
import CourseDetails from "./CourseDetails";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <div style={{ overflowX: "hidden" }}>
          <CourseDetails></CourseDetails>
        </div>
      </Route>
      <Route path={path}>
        <CourseList></CourseList>
      </Route>
    </Switch>
  );
}
