import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.css'
import { Login } from './auth/Login'
import { getRoutes } from './views/getRoutes'
import { routes } from './routes'
import { useEffect } from 'react'
import { connectWithWebSocket } from './chat/utils/wssConnection/wssConnection'

import { UserProvider } from './auth/providers/UserProvider'
import { Layout } from './views/Layout'

export const App = () => {
  useEffect(() => {
    connectWithWebSocket()
  }, [])

  return (
    <UserProvider>
      <Router>
        <div className='App'>
          <Route path='/Dashboard'>
            <Layout />
          </Route>
          <Switch>
            {getRoutes(routes)}
            <Route exact path='/'>
              <Login />
            </Route>
            <Redirect from='*' to='/Dashboard' />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  )
}
