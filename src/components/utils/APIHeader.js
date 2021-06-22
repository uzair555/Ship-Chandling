import { connect } from "react-redux"
import { HeaderConfig } from "../../env"

const API_Header = (props) => {
  return HeaderConfig = { Authorization: `Bearer ${props.token}` }
}

const mapStateToProps = state => {
  return {
    token: state.appToken
  }
}

export default connect(mapStateToProps, null)(API_Header)