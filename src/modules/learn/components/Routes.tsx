import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RegistrationList from "modules/registrations/components/RegistrationList";
import Learn from "./Learn";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/courses/:id`}>
        <div style={{ overflowX: "hidden" }}>
          <Learn />
        </div>
      </Route>
      <Route path={path}>
        <RegistrationList />
      </Route>
    </Switch>
  );
}
