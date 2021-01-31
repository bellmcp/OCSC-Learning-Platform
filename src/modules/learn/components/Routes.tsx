import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Learn from "./Learn";
// import Lecture from "./Lecture";
// import Video from "./Video";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {/* <Route path={`${path}/:id`}>
        <Lecture content={<Video />} id={3} />
      </Route> */}
      <Route path={path}>
        <Learn />
      </Route>
    </Switch>
  );
}
