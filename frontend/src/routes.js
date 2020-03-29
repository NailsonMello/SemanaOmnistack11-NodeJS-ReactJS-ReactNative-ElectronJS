import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/Index'
import Logon from './pages/Logon/Index'
import Register from './pages/Register/Index'
import Profile from './pages/Profile/Index'
import NewIncidents from './pages/NewIncidents/Index'

export default function Routes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Logon} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/incidents/new" component={NewIncidents} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}