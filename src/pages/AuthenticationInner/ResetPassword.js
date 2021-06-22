import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import { useHistory } from "react-router-dom"

// import images
import CarouselPage from "./CarouselPage"

import BackDrop from "../../components/utils/backdrop"
import Snackbar from "../../components/utils/Snackbar"

import axios from "axios"
import { CREATE } from "../../configuration/API-Instance"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isHidden, setIsHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [isMessageShow, setIsMessageShow] = useState(false)
  const [message, setMessage] = useState("")

  const history = useHistory()

  const resetPassword = () => {

    let email = localStorage.getItem("email")
    let resetToken = localStorage.getItem("resetToken")

    let body = {
      Email: email,
      Password: password,
      Token : resetToken
    }
    
      CREATE(`${process.env.REACT_APP_BASE_API_URL}/api/authenticate/ResetPassword`, body)
      .then(res => {
        if (res.status == 200) {
          setIsOpen(true)
          setTimeout(() => {
            history.push("/")
          }, 2000);
        }
      })
      .catch(e => {
        setIsMessageShow(true)
        setMessage("Something went wrong! Please Try again")
        setTimeout(() => {
          setIsMessageShow(false)
        }, 2000)
      })
  }

  const gotNext = () => {
    if (email !== "") {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  }

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <BackDrop open={isOpen} />
          <Row className="no-gutters">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div>
                      <Link to="/" className="d-block auth-logo">
                        <h1
                          className="text-center"
                          style={{ color: "#5570e7" }}
                        >
                          Fumigation
                        </h1>
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Reset Password to continue to Fumigation.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form action="">

                            <FormGroup>
                              <Label for="userpassword">Password</Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="userpassword"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="New password"
                                required
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label for="userpassword">Confirm Password</Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="userpassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                required
                              />
                            </FormGroup>

                            <div className="mt-3">
                              <button
                                className="btn btn-primary btn-block waves-effect waves-light"
                                type="button"
                                disabled={password !== confirmPassword}
                                onClick={resetPassword}
                              >
                                Reset
                              </button>
                            </div>
                        </Form>
                        <Snackbar open={isMessageShow} message={message} />
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Fumigation. Crafted
                        with <i className="mdi mdi-heart text-danger"></i> by
                        8Minds Solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ResetPassword
