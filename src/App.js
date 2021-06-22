import React, { useEffect } from "react"
import { isJwtExpired } from "jwt-check-expiration"
import { useHistory } from "react-router-dom"

// Import scss
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/theme.scss"
import "./style/style.css"
import Routers from "./routes/allRoutes"

function App() {
  const history = useHistory()
  useEffect(() => {
    let token = localStorage.getItem("token")
    if (!!token) {
      if (isJwtExpired(token)) {
        history.push("/")
        localStorage.removeItem("token")
      }
    }
  }, [])
  return (
    <div className="App">
      <Routers />
    </div>
  )
}

export default App
