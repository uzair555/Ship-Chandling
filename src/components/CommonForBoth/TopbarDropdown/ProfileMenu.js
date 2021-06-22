import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

import { Link, useHistory } from "react-router-dom"
import "./ProfileMenu.css"

const ProfileMenu = props => {
  const history = useHistory()
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [adminDetails, setAdminDetails] = useState({})

  const logout = () => {
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("token")
    history.push("/")
  }

  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem("loggedInUser"))
    setAdminDetails(obj)
  }, [])

  return (
    <React.Fragment>
      
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
          <i id="dropdown-show" style={{color:"white"}} className="fas fa-ellipsis-v"></i>
          <span className="d-none d-xl-inline-block ml-2 mr-1">{adminDetails.email}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="/admin/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle mr-1" />
            {"Profile"}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle mr-1" />
            {"My Wallet"}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge badge-success float-right">11</span>
            <i className="mdi mdi-settings font-size-17 align-middle mr-1" />
            {"Settings"}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle mr-1" />
            {"Lock screen"}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link onClick={logout} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
            <span>{"Logout"}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

export default ProfileMenu