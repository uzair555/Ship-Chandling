const initialStates = {
  navbar: Boolean,
}
const AppReducer = (state = initialStates, action) => {
  if (action.type === "OPEN_NAVBAR") {
    return {
      ...state,
      navbar: action.navbar,
    }
  } else if (action.type === "ADD_VAL_TO_NAVBAR") {
    return {
      ...state,
      navbar: action.navbar,
    }
  }
  return state
}

export default AppReducer
