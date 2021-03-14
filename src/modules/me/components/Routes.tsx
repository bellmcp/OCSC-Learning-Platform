import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Me from "./Me";
import CertificateList from "./CertificateList";

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/certificate`}>
        <CertificateList />
      </Route>
      <Route path={path}>
        <Me />
      </Route>
    </Switch>
  );
}
