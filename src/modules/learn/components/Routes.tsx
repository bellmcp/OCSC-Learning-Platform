import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Learn from "./Learn";
import Lecture from "./Lecture";
import Video from "./Video";
import Read from "./Read";
import Exam from "./Exam";
import Survey from "./Survey";
import File from "./File";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/demo/file`}>
        <Lecture content={<File />} id={7} />
      </Route>
      <Route path={`${path}/demo/survey`}>
        <Lecture content={<Survey />} id={6} />
      </Route>
      <Route path={`${path}/demo/exam`}>
        <Lecture content={<Exam />} id={5} />
      </Route>
      <Route path={`${path}/demo/read`}>
        <Lecture content={<Read />} id={4} />
      </Route>
      <Route path={`${path}/demo`}>
        <Lecture content={<Video />} id={3} />
      </Route>
      <Route path={path}>
        <Learn />
      </Route>
    </Switch>
  );
}
