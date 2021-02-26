import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Lecture from "./Learn";
import Video from "./Video";
import Read from "./Read";
import Exam from "./Exam";
import Survey from "./Survey";
import File from "./File";

import RegistrationList from "modules/registrations/components/RegistrationList";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/demo/file`}>
        <Lecture content={<File />} id={4} />
      </Route>
      <Route path={`${path}/demo/read`}>
        <Lecture content={<Read />} id={5} />
      </Route>
      <Route path={`${path}/demo/exam`}>
        <Lecture content={<Exam />} id={6} />
      </Route>
      <Route path={`${path}/demo/survey`}>
        <Lecture content={<Survey />} id={7} />
      </Route>
      <Route path={`${path}/demo`}>
        <Lecture content={<Video />} id={3} />
      </Route>
      <Route path={`${path}/courses/:id`}>
        <Lecture content={<Video />} id={3} />
      </Route>
      <Route path={path}>
        <RegistrationList />
      </Route>
    </Switch>
  );
}
