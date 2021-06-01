import * as React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './views/HomePage'
import ResultPage from './views/ResultsPage'
import SchoolsPage from './views/SchoolsPage'

const App = () => {
  return (
    <Switch>
      <Route path="/schools/:questId">
        <SchoolsPage />
      </Route>
      <Route path="/result/:questId/:schoolId">
        <ResultPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  )
}

export default App
