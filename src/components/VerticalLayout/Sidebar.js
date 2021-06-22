import PropTypes from "prop-types"
import React, { useEffect } from "react"
//i18n
import SidebarContent from "./SidebarContent"
import { connect } from "react-redux"

const Sidebar = props => {
  useEffect(() => {}, [props.open])

  return (
    <React.Fragment>
      <div
        className={props.open == true ? "vertical-menu-show" : "vertical-menu"}
      >
        <div
          data-simplebar
          className="h-100"
          style={{ backgroundColor: "#222736" }}
        >
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}
const mapStateToProps = state => {
  return {
    open: state.navbar,
  }
}
export default connect(mapStateToProps, null)(Sidebar)
