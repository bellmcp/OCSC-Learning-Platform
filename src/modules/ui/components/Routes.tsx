import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeRoutes from "modules/home/components/Routes";
import CoursesRoutes from "modules/courses/components/Routes";
import LearnRoutes from "modules/learn/components/Routes";
import SupportRoutes from "modules/support/components/Routes";
import UserRoutes from "modules/user/components/Routes";
import LoginRoutes from "modules/login/components/Routes";
import MeRoutes from "modules/me/components/Routes";

const PATH = "/learning-platform";

export default function Routes() {
  return (
    <Switch>
      <Route path={`${PATH}/courses`}>
        <CoursesRoutes></CoursesRoutes>
      </Route>
      <Route path={`${PATH}/learn`}>
        <LearnRoutes></LearnRoutes>
      </Route>
      <Route path={`${PATH}/support`}>
        <SupportRoutes></SupportRoutes>
      </Route>
      <Route path={`${PATH}/user`}>
        <UserRoutes></UserRoutes>
      </Route>
      <Route path={`${PATH}/login`}>
        <LoginRoutes></LoginRoutes>
      </Route>
      <Route path={`${PATH}/me`}>
        <MeRoutes></MeRoutes>
      </Route>
      <Route exact path={`${PATH}`}>
        <HomeRoutes></HomeRoutes>
      </Route>
      <Route>
        <h1 style={{ textAlign: "center" }}>Page not found</h1>
      </Route>
    </Switch>
  );
}