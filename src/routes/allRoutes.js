import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Login from "../pages/AuthenticationInner/Login"
import SignUp from "../pages/AuthenticationInner/SignUp"
import ResetPassword from "../pages/AuthenticationInner/ResetPassword"
import ForgotPassword from "../pages/AuthenticationInner/ForgotPassword"
import OTPPage from "../pages/AuthenticationInner/OTPPage"

// token based routes
import Dashboard from "../pages/Dashboard/index"

import NotFound from "../pages/Utility/pages-404"

import PrivateRoutes from "./Authorization/Route-Authorization"
import PublicRoutes from "./Authorization/Route-Gurad"

export default function Routers() {
  return (
    <Router>
      <Switch>
        <PublicRoutes path="/" exact component={Login} />
        <PublicRoutes path="/sign-up" exact component={SignUp} />
        <PublicRoutes
          exact
          path="/forgot-password"
          component={ForgotPassword}
        />
        <PublicRoutes exact path="/otp-code" component={OTPPage} />
        <PublicRoutes path="/reset-password" exact component={ResetPassword} />

        {/* Admin setup */}

        <PrivateRoutes path="/dashboard" exact component={Dashboard} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}
