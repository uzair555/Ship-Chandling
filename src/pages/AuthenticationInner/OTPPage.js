

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap";
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
import './OTPPage.css'

// import images
import CarouselPage from "./CarouselPage";

import BackDrop from "../../components/utils/backdrop";
import Snackbar from "../../components/utils/Snackbar";
import { CREATE } from "../../configuration/API-Instance";

const OTPPage = () => {
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")


    const [isOpen, setIsOpen] = useState(false)
    const [isDisable, setIsDisable] = useState(false)

    const [isMessageShow, setIsMessageShow] = useState(false)
    const [message, setMessage] = useState("")

    const history = useHistory()

    const getOTP = () => {

        let email = localStorage.getItem("email")

        CREATE(`/api/Authenticate/VerifyOTPReset?email=${email}&otp=${otp}`)
            .then(res => {
                setIsDisable(true)
                if (res.status == 200) {
                    setIsOpen(true)
                    localStorage.setItem("resetToken", res.data)
                    setTimeout(() => {
                        history.push("/reset-password")
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


    const handleChangeOtp = (val) => {
        setOtp(val)
    }

    console.log("=>", otp)

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
                                                    Ship Chandli
                                                </h1>
                                            </Link>
                                        </div>
                                        <div className="my-auto">
                                            <div>
                                                <h5 className="text-primary">Enter 4 Digits Code</h5>
                                                {/* <p className="text-muted">
                                                    Enter your email for verification.
                                                </p> */}
                                            </div>

                                            <div className="mt-4">


                                                <OtpInput
                                                    inputStyle={"OTPstyle"}

                                                    style={{ outerWidth: '50px' }}
                                                    value={otp}
                                                    onChange={handleChangeOtp}
                                                    numInputs={4}
                                                    separator={true}
                                                />
                                                <button
                                                    style={{ marginTop: "50px" }}
                                                    className="btn btn-primary btn-block waves-effect waves-light"
                                                    type="button"
                                                    onClick={getOTP}
                                                    disabled={
                                                        otp == "" || isDisable
                                                    }
                                                >
                                                    Get OTP
                                                </button>
                                            </div>
                                        </div>
                                        <Snackbar open={isMessageShow} message={message} />
                                        <div className="mt-4 mt-md-5 text-center">
                                            <p className="mb-0">
                                                © {new Date().getFullYear()} Ship Chandli. Crafted with{" "}
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

export default OTPPage
