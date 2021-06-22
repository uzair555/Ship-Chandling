import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody, Media, Button } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import Sidebar from "../../components/VerticalLayout/Sidebar"
import Header from "../../components/HorizontalLayout/Header"

import { makeStyles } from "@material-ui/core/styles"

import axios from "axios"
import BackDrop from "../../components/utils/backdrop"

import MessageSnackbar from "../../components/utils/Snackbar"

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BASE_API_URL } from "../../env"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}))

const UserProfile = props => {
  let token = localStorage.getItem("token")
  let HeaderConfig = { headers: { Authorization: `Bearer ${token}` } }

  const classes = useStyles()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [address, setaddress] = useState("")
  const [cell, setcell] = useState("")
  
  const [showemail, setshowemail] = useState("")
  const [showname, setshowname] = useState("")
  const [showaddress, setshowaddress] = useState("")
  const [showcell, setshowcell] = useState("")
 
  const [profileImage, setProfileImage] = useState(null)
  const [profileId, setprofileId] = useState(null)
  const [isValid, setisValid] = useState(false)
  const [open, setopen] = useState(false)
  const [Msg, setMsg] = useState("")

  const getLoggedInUserData = id => {
    axios
      .get(`${BASE_API_URL}/api/get-profile/${id}`, HeaderConfig)
      .then(result => {
        if (result.data.status == "success") {
          let obj = result.data.data
          setemail(obj.Email)
          setname(obj.Name)
          setaddress(obj.Address_1)
          setcell(obj.CellNo_1)
          
          setshowemail(obj.Email)
          setshowname(obj.Name)
          setshowaddress(obj.Address_1)
          setshowcell(obj.CellNo_1)
          
          // console.log(obj)
        }
      })
      .catch(e => {
        setisValid(true)
        setMsg(e.response.data.message)
        setTimeout(() => {
          setisValid(false)
        }, 1000)
      })
  }

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    getLoggedInUserData(loggedInUser._id)
    setprofileId(loggedInUser._id)
  }, [])

  const editProfile = () => {
    let body = {
      Name: name,
      Email: email,
      Address_1: address,
      CellNo_1: cell,
    }
    axios
      .put(`${BASE_API_URL}/api/edit-profile/${profileId}`, body, HeaderConfig)
      .then(result => {
        if (result.data.status == "success") {
          setisValid(true)
          setopen(true)
          setMsg(result.data.message)
          getLoggedInUserData(profileId)
          setTimeout(() => {
            setopen(false)
            setisValid(false)
          }, 1000)
        }
      })
      .catch(e => {
        setisValid(true)
        setMsg(e.response.data.message)
        setTimeout(() => {
          setisValid(false)
        }, 1000)
      })
  }

  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="User" breadcrumbItem="Profile" />
          <BackDrop open={open} />

          <Row>
            <Col md="4"></Col>
            <Col lg="6">
              <h3 className="mb-4">Profile</h3>
              <Card>
                <CardBody>
                  <Media>
                    <div className="mr-3">
                      <img
                        src={
                          profileImage
                            ? profileImage
                            : "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png"
                        }
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                      {/* <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={handleImage}
                      /> */}

                      {/* <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label> */}
                    </div>
                    <Media body className="align-self-center">
                      <div className="row">
                        <div className="text-muted col-md-6">
                          <h5>{showname}</h5>
                          <p className="mb-1">{showemail}</p>
                        </div>
                        <div className="text-muted col-md-6 text-right">
                          <h5>Address: {showaddress}</h5>
                          <p className="mb-1">Cell#: {showcell}</p>
                        </div>
                      </div>
                    </Media>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="4"></Col>
            <Col md="6">
              <Card>
                <CardBody>
                  <AvForm className="form-horizontal">
                    <div className="form-group">
                      <AvField
                        name="username"
                        label="UserName"
                        value={name}
                        className="form-control"
                        placeholder="Enter UserName"
                        type="text"
                        disabled
                        onChange={e => setname(e.target.value)}
                        required
                        helpMessage="username can not be edit"
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        name="email"
                        label="Email"
                        value={email}
                        className="form-control"
                        placeholder="Enter Email"
                        type="email"
                        onChange={e => setemail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        name="address"
                        label="Address"
                        value={address}
                        className="form-control"
                        placeholder="Enter Address"
                        type="text"
                        onChange={e => setaddress(e.target.value)}
                        required
                        // helpMessage="email can not be edit"
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        name="cell"
                        label="Cell"
                        value={cell}
                        className="form-control"
                        placeholder="Enter Cell"
                        type="text"
                        onChange={e => setcell(e.target.value)}
                        required
                        // helpMessage="email can not be edit"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Button
                        type="submit"
                        className="btn-md btn-block float-right"
                        color="primary"
                        onClick={editProfile}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </AvForm>
                </CardBody>
                <MessageSnackbar open={isValid} message={Msg} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    token: state.appToken,
  }
}

export default connect(mapStateToProps, null)(UserProfile)
