

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import { useHistory } from "react-router-dom"

// import images
import CarouselPage from "./CarouselPage"

import BackDrop from "../../components/utils/backdrop"
import Snackbar from "../../components/utils/Snackbar"
import { CREATE } from "../../configuration/API-Instance"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")


    const [isOpen, setIsOpen] = useState(false)
    const [isDisable, setIsDisable] = useState(false)

    const [isMessageShow, setIsMessageShow] = useState(false)
    const [message, setMessage] = useState("")

    const history = useHistory()

    const forgotPassword = () => {
        let body = {
            Email: email,

        }

        CREATE(`${process.env.REACT_APP_BASE_API_URL}/api/authenticate/ForgotPassword`, body)
            .then(res => {
                setIsDisable(true)
                if (res.status == 200) {
                    setIsOpen(true)
                    localStorage.setItem("email",email)
                    setTimeout(() => {
                        history.push("/otp-code")
                    }, 2000)
                }
            })
            .catch(e => {
                setIsMessageShow(true)
                setMessage(e.response.data.title)
                setTimeout(() => {
                    setIsMessageShow(false)
                }, 2000)
            })
    }

    const keyPress = e => {
        if (e.keyCode == 13) {
            loginNow()
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
                                                <h5 className="text-primary">Forgot Your Password</h5>
                                                <p className="text-muted">
                                                    Enter your email for verification.
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <Form action="">
                                                    <FormGroup>
                                                        <Label for="username">Email</Label>
                                                        <Input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            required
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                            placeholder="Enter Email"
                                                        />
                                                    </FormGroup>

                                                    <div className="mt-3">
                                                        <button
                                                            className="btn btn-primary btn-block waves-effect waves-light"
                                                            type="button"
                                                            onClick={forgotPassword}
                                                            disabled={
                                                                email == "" || isDisable
                                                            }
                                                        >
                                                            Send Email
                                                        </button>
                                                    </div>
                                                </Form>

                                            </div>
                                        </div>
                                        <Snackbar open={isMessageShow} message={message} />
                                        <div className="mt-4 mt-md-5 text-center">
                                            <p className="mb-0">
                                                © {new Date().getFullYear()} Fumigation. Crafted with{" "}
                                                <i className="mdi mdi-heart text-danger"></i> by 8Minds
                                                Solutions
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

export default ForgotPassword
