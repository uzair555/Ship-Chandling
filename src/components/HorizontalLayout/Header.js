import React, { useState } from "react"

import { Link } from "react-router-dom"

// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"
import { connect } from "react-redux"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import logo from "../../assets/images/logo-sm-light.png"
import logoLight from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-light.svg"
import logoDark from "../../assets/images/logo-light.png"

const Header = props => {
  const [menu, setMenu] = useState(false)
  const [isSearch, setSearch] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)
  const [toggleLeftmenu, settoggleLeftmenu] = useState(false)

  const [show, setshow] = useState(false)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  const openNav = () => {
    setshow(!show)
    props.openNavbar(show)
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header dark-theme-bg-color">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <h5 className="pt-4 text-white">Fumigation</h5>
                  {/* <img src={logoDark} alt="" height="17" /> */}
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <h5 className="pt-4 text-white">Fumigation</h5>
                  {/* <img src={logoLight} alt="" height="19" /> */}
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
              data-toggle="collapse"
              onClick={openNav}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ml-2">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                onClick={() => setSearch(!isSearch)}
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  isSearch
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={"Search" + "..."}
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={() => {
                  toggleFullscreen()
                }}
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            <NotificationDropdown />

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    open: state.navbar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openNavbar: val => {
      dispatch({ type: "ADD_VAL_TO_NAVBAR", navbar: val })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
