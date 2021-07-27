const messageReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

export const messageChange = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      })
    }, time)
  }
}

export default messageReducer
