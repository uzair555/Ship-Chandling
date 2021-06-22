import React from "react"
import { Redirect, Route } from "react-router-dom"

function PublicRoutes({ component: Component, ...rest }) {
  let isToken = localStorage.getItem("token")
  return (
    <Route
      {...rest}
      render={props =>
        isToken ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props}/>
        )
      }
    ></Route>
  )
}

export default PublicRoutes
