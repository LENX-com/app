import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route,  useRouteMatch} from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))


function App() {
  const { path } = useRouteMatch();

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer /> 
        <Switch>
          <Route path= {`${path}/login`} component={Login} /> 
          <Route path= {`${path}`} component={Layout} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Router>  
    </>
  )
}

export default App
