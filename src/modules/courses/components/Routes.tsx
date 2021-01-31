import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CourseList from "./CourseList";
import CourseDetails from "./CourseDetails";
import { COURSES } from "shared/courses";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <CourseDetails course={COURSES[0].courses[0]}></CourseDetails>
      </Route>
      <Route path={path}>
        <CourseList courses={COURSES}></CourseList>
      </Route>
    </Switch>
  );
}
