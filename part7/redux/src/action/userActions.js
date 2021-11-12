import axios from 'axios'

export const register = (newUser) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'USER_REGISTER_REQUEST' })

      const { data } = await axios.post('/api/users', newUser)
      dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'USER_REGISTER_FAIL', payload: error })
    }
  }
}

export const login = (credential) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'USER_LOGIN_REQUEST' })

      const { data } = await axios.post('/api/login', credential)

      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error })
    }
  }
}
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: 'USER_LOGOUT' })
    localStorage.removeItem('userInfo')
  }
}
