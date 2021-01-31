import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeRoutes from "modules/home/components/Routes";
import CoursesRoutes from "modules/courses/components/Routes";
import LearnRoutes from "modules/learn/components/Routes";
import SupportRoutes from "modules/support/components/Routes";
import UserRoutes from "modules/user/components/Routes";

export default function Routes() {
  return (
    <Switch>
      <Route path="/courses">
        <CoursesRoutes></CoursesRoutes>
      </Route>
      <Route path="/learn">
        <LearnRoutes></LearnRoutes>
      </Route>
      <Route path="/support">
        <SupportRoutes></SupportRoutes>
      </Route>
      <Route path="/user">
        <UserRoutes></UserRoutes>
      </Route>
      <Route exact path="/">
        <HomeRoutes></HomeRoutes>
      </Route>
      <Route>
        <h1 style={{ textAlign: "center" }}>Page not found</h1>
      </Route>
    </Switch>
  );
}
