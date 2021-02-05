import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeRoutes from "modules/home/components/Routes";
import CourseRoutes from "modules/courses/components/Routes";
import CurriculumRoutes from "modules/curriculums/components/Routes";
import LearnRoutes from "modules/learn/components/Routes";
import SupportRoutes from "modules/support/components/Routes";
import UserRoutes from "modules/user/components/Routes";
import LoginRoutes from "modules/login/components/Routes";
import MeRoutes from "modules/me/components/Routes";
import NotFound from "./NotFound";

const PATH = "/learning-platform";

export default function Routes() {
  return (
    <Switch>
      <Route path={`${PATH}/courses`}>
        <CourseRoutes></CourseRoutes>
      </Route>
      <Route path={`${PATH}/curriculums`}>
        <CurriculumRoutes></CurriculumRoutes>
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
        <NotFound />
      </Route>
    </Switch>
  );
}
