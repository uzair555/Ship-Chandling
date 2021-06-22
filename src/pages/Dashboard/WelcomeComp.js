import React, { useState, useEffect } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"
import { connect } from "react-redux"
import "./WelcomeComp.css"

import axios from "axios"

const WelcomeComp = props => {
  let token = localStorage.getItem("token")
  let HeaderConfig = { headers: { Authorization: `Bearer ${token}` } }
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [teamAssignmentCount, setteamAssignmentCount] = useState(0)

  const getTeamAssignmentsByUserId = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/get-team-to-assignment-by-id/${id}`, HeaderConfig)
      .then(result => {
        if (result.data.status == "success") {
          setteamAssignmentCount(result.data.data)
        }
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem("loggedInUser"))
    // setName(obj.Name.toUpperCase())
    setEmail(obj.email)
  }, [])

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-soft-primary">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back</h5>
                <p className="text-primary-para">Fumigation</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="6">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={
                    profileImage
                      ? profileImage
                      : "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png"
                  }
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <div className="arange-name-email">
              <h5 className="font-size-15 text-truncate">{name}</h5>
              <p className="text-muted mb-0 text-truncate">{email}</p>
              </div>
            </Col>

            <Col sm="6" className="col-welcome-style">
              <div className="pt-4">
                <Row>
                 <Col md="12">
                    <h5 className="font-size-13 text-right">{teamAssignmentCount}</h5>
                    <p className="text-muted mb-0 text-right">Team of Assignments</p>
                  </Col>
                </Row>
                <div className="mt-4" >
                  <Link
                  id="btn-link-welcome"
                    to="/admin/profile"
                    className="btn btn-primary waves-effect waves-light btn-sm float-right"
                  >
                    View Profile <i id="arrow-styling" className="mdi mdi-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    token: state.appToken,
  }
}

export default connect(mapStateToProps, null)(WelcomeComp)
