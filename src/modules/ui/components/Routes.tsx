import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeRoutes from 'modules/home/components/Routes'
import CourseRoutes from 'modules/courses/components/Routes'
import CurriculumRoutes from 'modules/curriculums/components/Routes'
import LearnRoutes from 'modules/learn/components/Routes'
import SupportRoutes from 'modules/support/components/Routes'
import LoginRoutes from 'modules/login/components/Routes'
import MeRoutes from 'modules/me/components/Routes'
import SearchRoutes from 'modules/search/components/Routes'
import DemoContentRoutes from 'modules/democontent/Routes'
import PrivateRoute from 'modules/routes/PrivateRoute'
import NotFound from './NotFound'

const PATH = process.env.REACT_APP_BASE_PATH

export default function Routes() {
  return (
    <Switch>
      <Route path={`${PATH}/courses`}>
        <CourseRoutes />
      </Route>
      <Route path={`${PATH}/curriculums`}>
        <CurriculumRoutes />
      </Route>
      <Route path={`${PATH}/search`}>
        <SearchRoutes />
      </Route>
      <Route path={`${PATH}/democontent`}>
        <DemoContentRoutes />
      </Route>
      <PrivateRoute component={LearnRoutes} path={`${PATH}/learn`} />
      <PrivateRoute component={SupportRoutes} path={`${PATH}/support`} />
      <PrivateRoute component={MeRoutes} path={`${PATH}/me`} />
      <Route path={`${PATH}/login`}>
        <LoginRoutes />
      </Route>
      <Route exact path={`${PATH}`}>
        <HomeRoutes />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
