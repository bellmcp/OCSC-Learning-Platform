import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Me from './Me';
import CertificateList from './CertificateList';
import CourseCertificateView from './CourseCertificateView';
import CurriculumCertificateView from './CurriculumCertificateView';
import OrientationScoreView from './OrientationScoreView';

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/certificate/course/:id`}>
        <CourseCertificateView />
      </Route>
      <Route path={`${path}/certificate/curriculum/:id`}>
        <CurriculumCertificateView />
      </Route>
      <Route path={`${path}/certificate`}>
        <CertificateList />
      </Route>
      <Route path={`${path}/score`}>
        <OrientationScoreView />
      </Route>
      <Route path={path}>
        <Me />
      </Route>
    </Switch>
  );
}
