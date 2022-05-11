import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DemoContent from './DemoContent'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path}>
        <DemoContent />
      </Route>
    </Switch>
  )
}
