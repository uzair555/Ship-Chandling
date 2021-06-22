import React from "react"
import { Redirect, Route } from "react-router-dom"

function PrivateRoutes({ component: Component, ...rest }) {
  let isToken = localStorage.getItem("token") && localStorage.getItem("loggedInUser") 
  return (
    <Route
      {...rest}
      render={props =>
        isToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    ></Route>
  )
}

export default PrivateRoutes
